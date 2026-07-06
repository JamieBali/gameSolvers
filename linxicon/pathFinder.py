import pickle
import numpy as np


def find_path(starting_word, ending_word, mapping):
    routes = [starting_word]

    while True:
        temp_routes = []
        for route in routes:
            if type(route) == type(str("str")):
                word_to_check = route
            else:
                word_to_check = route[-1]
            outward_paths = mapping[word_to_check]
            for word in outward_paths:

                if word == ending_word:
                    route.append(word)
                    return route
                
                else:
                    if type(route) == type(str("str")):
                        temp = [route]
                    else:
                        temp = list(np.copy(route))
                    temp.append(word)
                temp_routes.append(temp)
        routes = temp_routes

with open('saved_dictionary.pkl', 'rb') as f:
    loaded_dict = pickle.load(f)

w1 = input("starting word: ")
w2 = input("ending word: ")

print(find_path(w1,w2,loaded_dict))
