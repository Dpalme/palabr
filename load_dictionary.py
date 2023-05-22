def load(file_name) -> set:
    """
    Loads a given file

    Args: 
        `file_name`: str
    
    Exceptions:
        `IOError`: IOError
    """
    with open(file_name) as in_file:
        loaded_txt = in_file.read().rsplit("\n")
        loaded_txt = {x.lower() for x in loaded_txt if len(x) > 1}
        return loaded_txt
