import sys

class reversor:
    def __init__(self, obj):
        self.obj = obj

    def __eq__(self, other):
        return other.obj == self.obj

    def __lt__(self, other):
        return other.obj < self.obj

def main():
    a = [['Kristi Martone','Esthetician', 3], ['Zizzy','Esthetician', 3], 
            ['Lemmy','Admin', 3], ['Aerial','Admin', 3]]

    a.sort(key=lambda x: (reversor(x[1]), x[0]))

    print(a)


if __name__ == '__main__':
    main()


