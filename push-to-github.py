#!/usr/bin/env python3
"""
Create repo ptulin/pavotu if needed and push from local git.
Uses GITHUB_TOKEN or ~/.github_token (same as DE.Main).
"""
import os
import subprocess
import json
import urllib.request
import urllib.error

USERNAME = 'ptulin'
REPO_NAME = 'pavotu'

def get_token():
    token = os.environ.get('GITHUB_TOKEN')
    if token:
        return token.strip()
    token_file = os.path.expanduser('~/.github_token')
    if os.path.exists(token_file):
        with open(token_file, 'r') as f:
            return f.read().strip()
    try:
        r = subprocess.run(['gh', 'auth', 'token'], capture_output=True, text=True, timeout=5)
        if r.returncode == 0:
            return r.stdout.strip()
    except Exception:
        pass
    return None

def api(method, url, data=None, token=None):
    headers = {'Accept': 'application/vnd.github.v3+json', 'User-Agent': 'Python'}
    if token:
        headers['Authorization'] = f'token {token}'
    req_data = json.dumps(data).encode() if data else None
    if data:
        headers['Content-Type'] = 'application/json'
    req = urllib.request.Request(url, data=req_data, headers=headers, method=method)
    try:
        with urllib.request.urlopen(req) as res:
            return json.loads(res.read().decode())
    except urllib.error.HTTPError as e:
        return {'error': True, 'code': e.code, 'body': e.read().decode() if e.fp else ''}

def main():
    print(f"🚀 Push to GitHub: {USERNAME}/{REPO_NAME}")
    token = get_token()
    if not token:
        print("❌ No GitHub token. Use: export GITHUB_TOKEN=... or create ~/.github_token")
        print("   Get token: https://github.com/settings/tokens (scope: repo)")
        return 1

    # Ensure repo exists
    repo_url = f'https://api.github.com/repos/{USERNAME}/{REPO_NAME}'
    repo = api('GET', repo_url, token=token)
    if repo.get('error') and repo.get('code') == 404:
        print("📦 Creating repository: pavotu")
        create = api('POST', 'https://api.github.com/user/repos',
                     data={'name': REPO_NAME, 'private': False}, token=token)
        if create.get('error'):
            print("❌ Create repo failed:", create.get('body', create))
            return 1
        print("✅ Repository created")
    elif repo.get('error'):
        print("❌ API error:", repo)
        return 1

    # Push via git (token in URL)
    repo_dir = os.path.dirname(os.path.abspath(__file__))
    remote = f'https://{token}@github.com/{USERNAME}/{REPO_NAME}.git'
    subprocess.run(['git', 'remote', 'set-url', 'origin', remote], cwd=repo_dir, check=True)
    r = subprocess.run(['git', 'push', '-u', 'origin', 'main'], cwd=repo_dir, capture_output=True, text=True, timeout=60)
    if r.returncode != 0:
        print("❌ git push failed:", r.stderr or r.stdout)
        return 1
    print("✅ Pushed to https://github.com/ptulin/pavotu")
    return 0

if __name__ == '__main__':
    exit(main())
