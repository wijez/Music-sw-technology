from enum import Enum

class GenreEnum(Enum):
    RAP = 'Rap'
    LOFI =  'Lofi'
    CLASSICAL =  'Classical'
    INDIE =  'Indie'
    SOUL =  'Soul'
    REMIX = 'Remix'

    @classmethod
    def choices(cls):
        return [(choice.name, choice.value) for choice in cls]