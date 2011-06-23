activities = []

num_of_activities = input('How many actvities do you want to enter? ')


for i in range(int(num_of_activities)):
  tmp = input('Enter tags for activity ' + str(i+1) + ': ')
  tmp = tmp.split(' ')
  name = tmp[0]
  tags = tmp[1:]
  tags[len(tags)-1] = tags[len(tags)-1][:-1]
  activities.append({'name': name, 'tags': tags})
  print('*** Added Activity(Name: %s, Tags: %s) ***' %(name, tags))

all_tags = []
for activity in activities:
  for tag in activity['tags']:
    if tag not in all_tags:
      all_tags.append(tag)

binary_activities = []
for activity in activities:
    nactivity = {}
    nactivity['name'] = activity['name']
    nactivity['tags'] = []
    for tag in all_tags:
      if tag in activity['tags']: nactivity['tags'].append(1)
      else: nactivity['tags'].append(0)
    binary_activities.append(nactivity)
    
print(binary_activities)
    
