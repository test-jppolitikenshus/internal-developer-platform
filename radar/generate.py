#!/usr/bin/env python 

import csv
import json
import re
import datetime


# The known quadrants in the order they have in the HTLM template
#quadrants = ['Languages', 'Infrastructure', 'Datastores', 'Frameworks']
quadrants = ['Languages', 'Infrastructure', 'Datastores', 'Techniques']

# The known rings in the order they have in the HTLM template
rings = ['Adopt', 'Trial', 'Hold']

move_pattern = re.compile('(NIL|Adopt|Trial|Hold) --> (NIL|Adopt|Trial|Hold)')

def is_header(row):
    return row[0] == 'Product'

def to_move(move_spec):
    match = move_pattern.search(move_spec)
    move_from = match.group(1)
    move_to = match.group(2)
    if move_from == 'NIL':
        return 0
    else:
        return rings.index(move_from) - rings.index(move_to)

def to_entry(row):
    label = row[0]
    quadrant = quadrants.index(row[1])
    quadrantName = row[1]
    ring = rings.index(row[2])
    ringName = row[2]
    moved = to_move(row[3])
    active = True
    return {
        'label': label,
        'quadrant': quadrant,
        'quadrantName': quadrantName,
        'ring': ring,
        'ringName': ringName,
        'moved': moved,
        'active': active,
        'link': ''
    }


if __name__ == '__main__':
    entries = []
    with open('data.tsv') as tsv:
        reader = csv.reader(tsv, delimiter='\t')
        for row in reader:
            if len(row) == 4 and not is_header(row):
                entry = to_entry(row)
                entries.append(entry)

    entries_as_json = json.dumps(entries)

    x = datetime.datetime.now()

    date = str(x.month) + "/" + str(x.year)

    with open('index.template') as template_file:
        template = template_file.read();
        html = template.replace("{{ENTRIES}}", entries_as_json)
        html = html.replace("{{DATE}}", date)
        print(html)
