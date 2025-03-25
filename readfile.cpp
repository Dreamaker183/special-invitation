#include <iostream>
#include <fstream>

using namespace std;

int main() {

  /* this following part is about reading an input from keyboard */
  int n;
  cout<<"Please input an integer\n";
  cin>>n;
  cout<<"I read an integer "<<n<<endl;

  /* this following part is about reading a file */
  ifstream inFile("test1.txt");
  
  if (!inFile.is_open()) {
    cout << "Error: cannot open data file" << endl;
    exit(0); //terminate the program
  }

  cout<<"The input file is"<<endl;
  
  while (!inFile.eof()) { //not end of file
    int i;
    inFile >> i;    //read in an integer
    
    if (!inFile.fail())
      cout<<i<<" ";
    else
      break;
  }
  
  inFile.close();
  cout << endl; 
}

