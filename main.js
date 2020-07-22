import { ToyReact } from './ToyReact';

class MyComponent {
  mountTo(parent) {
    let vdom = this.render();
    vdom.mountTo(parent);
  }
  setAttribute(name, value) {
    // react里所有的attribute就是property
    this[name] = value;
  }
  render() {
    return <div>Cool</div>
  }
}

let a = <MyComponent name="my-component" id="abc" />

// document.body.appendChild(a);

ToyReact.render(
  a,
  document.body
);

// let a = <div name="a" id="abc">
//   <span>Hello</span>
//   <span>World<a>abc</a></span>
//   <span>!</span>
// </div>

/*
  字符串不放在眼里，只有<>才能让它产生动力
  var a = ToyReact.createElement("div", {
    name: "a",
    id: "abc"
  }, 
  ToyReact.createElement("span", null, "Hello"), 
  ToyReact.createElement("span", null, "World", 
  ToyReact.createElement("a", null, "abc")), 
  ToyReact.createElement("span", null, "!"));
  console.log(a);
  document.body.appendChild(a);
*/



