#!/usr/bin/env python3
"""Build a source handoff manifest from committed Git blobs."""

import argparse
import hashlib
import json
import re
import subprocess
from urllib.parse import quote


def git(repo, *args):
    result = subprocess.run(
        ["git", "-C", repo, *args], capture_output=True, check=False
    )
    if result.returncode:
        raise ValueError(result.stderr.decode(errors="replace").strip())
    return result.stdout


def relative_path(value):
    if "\\" in value or any(part in {"", ".", ".."} for part in value.split("/")):
        raise argparse.ArgumentTypeError("Use a slash-separated relative path")
    return value


def manifest(repo, github, revision, game, requested):
    if not re.fullmatch(r"[A-Za-z0-9_-]+/[A-Za-z0-9_.-]+", github):
        raise ValueError("Provide a GitHub owner/repository")
    commit = git(repo, "rev-parse", "--verify", "--end-of-options", revision + "^{commit}")
    commit = commit.decode().strip()
    tree = git(repo, "ls-tree", "-rz", "--full-tree", commit, "--", ":(literal)" + game + "/")
    prefix = game + "/"
    selected = set(requested)
    files = []
    for entry in tree.split(b"\0"):
        if not entry:
            continue
        metadata, raw_path = entry.split(b"\t", 1)
        mode, kind, blob = metadata.decode().split()
        path = raw_path.decode()
        name = path.removeprefix(prefix)
        if selected and name not in selected:
            continue
        if kind != "blob" or mode not in {"100644", "100755"}:
            raise ValueError(f"{path} is not a regular file in the pinned commit")
        data = git(repo, "cat-file", "blob", blob)
        files.append(
            {
                "file": name,
                "raw_url": f"https://raw.githubusercontent.com/{github}/{commit}/{quote(path)}",
                "bytes": len(data),
                "sha256": hashlib.sha256(data).hexdigest(),
            }
        )
    missing = selected - {item["file"] for item in files}
    if missing:
        raise ValueError("Missing from the pinned commit: " + ", ".join(sorted(missing)))
    if not files:
        raise ValueError(f"No files found in {game!r} at {commit}")
    return {
        "commit": commit,
        "source_directory": f"https://github.com/{github}/tree/{commit}/{quote(game)}",
        "files": files,
    }


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--repo", required=True, help="Path to the local Git repository")
    parser.add_argument("--github", required=True, help="GitHub owner/repository")
    parser.add_argument("--commit", required=True, help="Commit SHA or local Git revision")
    parser.add_argument("--game", required=True, type=relative_path, help="Path from repository root")
    parser.add_argument("--file", action="append", default=[], type=relative_path)
    args = parser.parse_args()
    try:
        result = manifest(args.repo, args.github, args.commit, args.game, args.file)
    except (OSError, ValueError) as exc:
        parser.exit(1, f"{exc}\n")
    print(json.dumps(result, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
