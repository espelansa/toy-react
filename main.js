import { ToyReact, Component } from './ToyReact';

class MyComponent extends Component {
  
  render() {
    return <div>
              <span>Hello World!</span>
              {this.children}
            </div>
  }
}

class Inner extends Component {
  render() {
    return <section>
            {this.children}
           </section>
  }
}

let a = <MyComponent name="my-component" id="abc">
          123
          <div>abc</div>
          <Inner>
            <p>inner</p>
            <a>Inside Inner Component</a>
          </Inner>
        </MyComponent>

// document.body.appendChild(a);

ToyReact.render(
  a,
  document.body
);









/*
  let node = <div name="a" id="abc">
    <span>Hello</span>
    <span>World<a>abc</a></span>
    <span>!</span>
  </div>

  =========================================

  字符串不放在眼里，只有<>才能让它产生动力
  var node = ToyReact.createElement("div", {
    name: "a",
    id: "abc"
  }, 
  ToyReact.createElement("span", null, "Hello"), 
  ToyReact.createElement("span", null, "World", 
  ToyReact.createElement("a", null, "abc")), 
  ToyReact.createElement("span", null, "!"));
  document.body.appendChild(node);
*/



