import React from 'react';
import { Avatar } from 'antd';
import './style.scss';

class GitHubDemo extends React.Component {
  constructor() {
    super();
    this.state = {
      date: [
        { id : 1, content : ["轮播图","瀑布流","回到顶部"], avatar : "https://avatars2.githubusercontent.com/u/53843731?v=4", backImg: "https://t9.baidu.com/it/u=583874135,70653437&fm=79&app=86&size=h300&n=0&g=4n&f=jpeg?sec=1597241264&t=14ecff430061f104fc96588362d94bb8"},
        { id : 2, content : ["轮播图","瀑布流","回到顶部","CSS","回到顶部","CSS"], avatar : "https://avatars2.githubusercontent.com/u/53843731?v=4", backImg: "https://t9.baidu.com/it/u=3363001160,1163944807&fm=79&app=86&size=h300&n=0&g=4n&f=jpeg?sec=1597241264&t=19641810ee1e75f18aca6ef0e15024d9"},
        { id : 3, content : ["轮播图","瀑布流","回到顶部","hh"], avatar : "https://avatars2.githubusercontent.com/u/53843731?v=4", backImg: "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1913697520,1010929488&fm=26&gp=0.jpg"},
        { id : 4, content : ["懒加载","瀑布流","回到顶部",'tiga','dana','gaya'], avatar : "https://avatars2.githubusercontent.com/u/53843731?v=4", backImg: "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2067130472,770689586&fm=26&gp=0.jpg"},
      ]
    }
  }
  componentDidMount() {
    console.log("调用GitHub来源接口");
  }
  mapTag(tags) {
    const tag = tags.map((item) => 
      <span key={ (item.length + Math.random()).toFixed(4) }>
        <strong style={{fontSize: Math.round(Math.random() * 7 + 12) + 'px'}}>{item}</strong>
      </span>
    )
    return tag;
  }
  render() {
    return(
      <section className="home-github-demo">
        <ul>
          {this.state.date.map((post) => 
            <li key={post.id} style={{background: `url(${post.backImg})`}}>
              <aside title="avatar">
                <Avatar size={50} src={post.avatar} />
                <strong>Greatiga</strong>
              </aside>
              <article>
                {this.mapTag(post.content)}
              </article>
            </li>
          )}
        </ul>
      </section>
    );
  }
}

export default GitHubDemo;