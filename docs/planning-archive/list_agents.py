import json

with open('data/agents.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

for a in data['agents']:
    print(f"[{a['category']}] {a['name']} ({a['fullName']})")
