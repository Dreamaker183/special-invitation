#include <iostream>
#include <fstream>
using namespace std;

struct Node {
    int data;
    Node* next;
    Node(int d) : data(d), next(nullptr) {}
};

void rearrangeEvenOdd(Node*& head) {
    if (!head) return;
    Node* evenHead = nullptr, *evenTail = nullptr;
    Node* oddHead = nullptr, *oddTail = nullptr;
    Node* current = head;
    int index = 1;
    while (current) {
        Node* nextNode = current->next;
        if (index % 2 == 0) {
            if (!evenHead) {
                evenHead = current;
                evenTail = current;
            } else {
                evenTail->next = current;
                evenTail = current;
            }
        } else {  
            if (!oddHead) {
                oddHead = current;
                oddTail = current;
            } else {
                oddTail->next = current;
                oddTail = current;
            }
        }
        current->next = nullptr;
        current = nextNode;
        index++;
    }
    if (evenHead) {
        head = evenHead;
        evenTail->next = oddHead;
    } else {
        head = oddHead;
    }
}

Node* buildList(const char* filename) {
    ifstream inFile(filename);
    if (!inFile) {
        cerr << "Error: cannot open " << filename << endl;
        return nullptr;
    }
    Node* head = nullptr;
    Node* tail = nullptr;
    int value;
    while (inFile >> value) {
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
    return head;
}

void printList(Node* head) {
    Node* curr = head;
    while (curr) {
        cout << curr->data;
        if (curr->next) cout << " ";
        curr = curr->next;
    }
    cout << "\n";
}

void freeList(Node* head) {
    while (head) {
        Node* tmp = head;
        head = head->next;
        delete tmp;
    }
}

int main() {
    Node* head1 = buildList("testData1.txt");
    Node* head2 = buildList("testData2.txt");

    if (head1) rearrangeEvenOdd(head1);
    if (head2) rearrangeEvenOdd(head2);

    if (head1) printList(head1);
    if (head2) printList(head2);

    freeList(head1);
    freeList(head2);
    
    return 0;
}
