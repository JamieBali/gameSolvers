import pickle
import numpy as np


def find_path(starting_word, ending_word, mapping):

    # first confirm both words are in the list
    try:
        _ = mapping[starting_word]
    except:
        print("selected STARTING word not included in dictionary")
        return False
    try:
        _ = mapping[ending_word]
    except:
        print("selected ENDING word not included in dictionary")
        return False

    # then do a 0th level, appending the first set into a list
    initials = mapping[starting_word]
    routes = []
    for word in initials:
        if word == ending_word:
            return [starting_word, word]
        routes.append([starting_word, word])

    # then recurse. We'll do a maximum of 10 recursions before calling it quits
    for _ in range (0,10):
        temp_routes = []
        for route in routes:
            word_to_check = route[-1]
            outward_paths = mapping[word_to_check]
            for word in outward_paths:

                if word == ending_word:
                    route.append(word)
                    return route
                
                temp = []
                for item in route:
                    temp.append(item)
                temp.append(word)
                temp_routes.append(temp)
        routes = temp_routes

    print("unable to find a route")
    return False

with open('saved_dictionary.pkl', 'rb') as f:
    loaded_dict = pickle.load(f)

print(find_path("find","cat",loaded_dict))
