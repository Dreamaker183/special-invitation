#include <iostream>
#include <fstream>
#include <vector>
using namespace std;

struct Node {
    int data;
    Node* next;
    Node(int d) : data(d), next(nullptr) {}
};

int main() {
    ifstream inFile("testdata.txt");
    if (!inFile) {
        cerr << "Error: cannot open data file" << endl;
        return 1;
    }

    vector<int> A;
    Node* head = nullptr;
    Node* tail = nullptr;
    int value;
    while (inFile >> value) {
        A.push_back(value);
        Node* newNode = new Node(value);
        if (!head) {
            head = newNode;
            tail = newNode;
        } else {
            tail->next = newNode;
            tail = newNode;
        }
    }
    inFile.close();

    for (size_t i = 0; i < A.size(); ++i) {
        cout << "The address of array element A[" << i << "] is " 
             << &A[i] << endl;
    }

    cout << "The addresses of the nodes in the linked list are: ";
    Node* current = head;
    while (current) {
        cout << current;
        if (current->next) cout << " ";
        current = current->next;
    }
    cout << endl;

    /*
    I found that the array elements' addresses are contiguous in memory 
    (each consecutive element’s address increases by a fixed amount). 
    In contrast, the nodes of the linked list are not stored contiguously; 
    their addresses are not sequential. This is because the array allocates 
    one continuous block of memory for all its elements, whereas each linked 
    list node is individually allocated on the heap.
    */

    current = head;
    while (current) {
        Node* tmp = current;
        current = current->next;
        delete tmp;
    }

    return 0;
}
