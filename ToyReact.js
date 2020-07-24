
class ElementWrapper {
  constructor(type) {
    this.root = document.createElement(type);
  }
  setAttribute(name, value) {
    this.root.setAttribute(name, value);
  }
  appendChild(vchild) {
    // 由虚向实
    vchild.mountTo(this.root);
  }
  mountTo(parent) {
    parent.appendChild(this.root);
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
    for (let child of children) {
      if (typeof child === 'string') {
        child = new TextWrapper(child);
      }
      element.appendChild(child);
    }
    return element;
  },

  render(vdom, element) {
    // vdom => 实dom的过程
    vdom.mountTo(element);
  }
}

export class Component {
  mountTo(parent) {
    console.log(parent, 'parent')
    let vdom = this.render();
    vdom.mountTo(parent);
  }
  setAttribute(name, value) {
    // react里所有的attribute就是property
    this[name] = value;
  }
}