var AVL = require("./AVL");

var AVLtest = new AVL();
//prettier-ignore
test("insert and balance with left rotation ", () => {           
  AVLtest.insert(1);                                                //1
  AVLtest.insert(2);                                                //  2           -> before balance
  AVLtest.insert(3);                                                //     3    
  expect(AVLtest.root.value).toBe(2);                                          
  expect(AVLtest.root.left.value).toBe(1);                          //   2  
  expect(AVLtest.root.right.value).toBe(3);                         // 1    3        -> after balance
});
//prettier-ignore
test("insert and balance with right rotation", () => {
  AVLtest.insert(0);                                                //         2                                          2
  AVLtest.insert(-1);                                              //       1       3    -> before balance              0     3  -> after balance
  expect(AVLtest.root.left.value).toBe(0);                          //   0                                           -1   1 
  expect(AVLtest.root.left.left.value).toBe(-1);                    //-1
  expect(AVLtest.root.left.right.value).toBe(1);
});
//prettier-ignore
test("remove and rebalance", () => {
  AVLtest.remove(3);                                                //         2                                         0
  expect(AVLtest.root.value).toBe(0);                               //       0        -> before balance              -1     2      -> after balance 
  expect(AVLtest.root.left.value).toBe(-1);                         //    -1   1                                          1 
  expect(AVLtest.root.right.value).toBe(2);                         
  expect(AVLtest.root.right.left.value).toBe(1);
});
