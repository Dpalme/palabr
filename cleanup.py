import load_dictionary

words = load_dictionary.load('05.txt')
words = (*filter(lambda w: True not in map(lambda l: ord(l) > 120, w), words),)
print(len(words))
with open('filtered_05.txt', 'w', encoding='UTF-8') as dump_file:
    dump_file.write('\n'.join(words))
