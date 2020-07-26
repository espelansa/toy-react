
class ElementWrapper {
  constructor(type) {
    this.root = document.createElement(type);
  }
  setAttribute(name, value) {
    if (name.match(/^on([\s\S]+)$/)) {
      this.root.addEventListener(RegExp.$1.replace(/^[\s\S]/, s => s.toLowerCase()), value);
    }
    if (name === 'className') {
      name = 'class';
    }
    this.root.setAttribute(name, value);
  }
  appendChild(vchild) {
    // 由虚向实
    vchild.mountTo(this.root);
  }
  mountTo(range) {
    range.deleteContents();
    range.insertChildren(this.root);
  }
}

class TextWrapper {
  constructor(text) {
    this.root = document.createTextNode(text);
  }
  mountTo(parent) {
    parent.appendChild(this.root);
  }
}


export const ToyReact = {
  createElement(type, attributes, ...children) {
    let element;
    // typeof type === 'string' 说明是一个原生元素
    if (typeof type === 'string') {
      element = new ElementWrapper(type);
    } else {
      // 反之，则为自己设计的组件
      element = new type;
    }
    for (let name in attributes) {
      // attribute 和 property 在普通的dom元素上完全是两个概念
      element.setAttribute(name, attributes[name]);
    }
    let insertChildren = (children) => {
      for (let child of children) {
        if (typeof child === 'object' && child instanceof Array) {
          // 递归
          insertChildren(child);
        } else {
          if (!(child instanceof Component) && !(child instanceof ElementWrapper) && !(child instanceof TextWrapper)) {
            child = String(child);
          }
          if (typeof child === 'string') {
            child = new TextWrapper(child);
          }
          element.appendChild(child);
        }
      }
    }
    insertChildren(children);
    return element;
  },

  render(vdom, element) {
    let range = document.createRange();
    if (element.children.length) {
      range.setStartAfter(element.lastChild);
      range.setEndAfter(element.lastChild);
    } else {
      range.setStart(element, 0);
      
    }
  }
}

export class Component {
  constructor() {
    this.children = [];
    this.props = Object.create(null);
  }
  mountTo(range) {
    range.deleteContents();
    let vdom = this.render();
    vdom.mountTo(range);
  }
  setAttribute(name, value) {
    // react里所有的attribute就是property
    this[name] = value;
    this.props[name] = value;
  }
  appendChild(vchild) {
    this.children.push(vchild);
    // 打印顺序：Inner里的p和a --> MyComponent里的text, div和Inner
    // console.log('component | appendchild', this.children);
  }
  setState(state) {
    let merge = (oldState, newState) => {
      for (let p in newState) {
        if (typeof newState[p] === 'object') {
          if (typeof oldState[p] !== 'object') {
            oldState[p] = {};
          }
          merge(oldState[p], newState[p]);
        } else {
          oldState[p] = newState[p];
        }
      }
    }
    if (!this.state && state) {
      this.state = {}
    }
    merge(this.state, state);
    console.log(this.state)
  }
}