'use strict';

var mod = require('../../src/data-structures/red-black-tree.js'),
    Node = mod.Node,
    RBTree = mod.RBTree,
    Colors = mod.Colors;

describe('Node', function () {

  it('should be a constructor function', function () {
    expect(typeof Node).toBe('function');
  });

  it('should set all properties via the constructor', function () {
    var node = new Node('key', 'value', 1, 2, Colors.RED);
    expect(node.getKey()).toBe('key');
    expect(node.getLeft()).toBe(1);
    expect(node.getRight()).toBe(2);
    expect(node.getValue()).toBe('value');
    expect(node.isRed()).toBeTruthy();
  });

  describe('Node flipColor', function () {
    it('should has method flipColor', function () {
      var node = new Node();
      expect(typeof node.flipColor).toBe('function');
    });
    it('should work properly', function () {
      var node = new Node();
      expect(node.isRed()).toBe(false);
      node.flipColor();
      expect(node.isRed()).toBe(true);
      node.flipColor();
      expect(node.isRed()).toBe(false);
    });
  });
});

describe('RBTree', function () {
  it('should be a constructor function', function () {
    expect(typeof RBTree).toBe('function');
  });
  it('should initialize root to null by default', function () {
    expect(new RBTree()._root).toBeNull();
  });

  describe('node insertion', function () {
    it('should be able to insert a node in empty tree', function () {
      var tree = new RBTree();
      tree.put('foo', 'bar');
      expect(tree._root.getKey()).toBe('foo');
      expect(tree._root.getValue()).toBe('bar');
    });

    it('should be able to insert a node in 1 level tree', function () {
      var tree = new RBTree();
      tree.put(1, 'bar');
      tree.put(0, 'baz');
      expect(tree._root.getLeft()).not.toBeNull();
      expect(tree._root.getLeft().isRed()).toBeTruthy();
      tree.put(2, 'baz');
      expect(tree._root.getRight()).not.toBeNull();
      expect(tree._root.getRight().isRed()).toBeFalsy();

      tree = new RBTree();
      tree.put(1, 'bar');
      tree.put(2, 'foo');
      tree.put(3, 'baz');
      expect(tree._root.getRight()).not.toBeNull();
      expect(tree._root.getLeft()).not.toBeNull();
      expect(tree._root.isRed()).toBeFalsy();
      expect(tree._root.getRight().isRed()).toBeFalsy();
      expect(tree._root.getLeft().isRed()).toBeFalsy();
      tree.put(4, 'foobar');
      tree.put(5, 'foobar');
      expect(tree._root.getRight().getRight()).not.toBeNull();
      expect(tree._root.getRight().getRight().isRed()).toBeFalsy();
    });

  });

  describe('get method', function () {
    var tree = new RBTree();
    expect(tree.get(1)).toBeUndefined();
    tree.put(1, 'baz');
    expect(tree.get(1)).toBe('baz');
    tree.put(2, 'foo');
    expect(tree.get(2)).toBe('foo');
    tree.put(3, 'bar');
    expect(tree.get(3)).toBe('bar');
    expect(tree.get(4)).toBeUndefined();
    tree.put(5, 'foobar');
    expect(tree.get(5)).toBe('foobar');
    tree.put(5, 'foobar1');
    expect(tree.get(5)).toBe('foobar1');
  });

});