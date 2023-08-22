function Nav(props){
    const lis = []
    for(let i=0; i<props.topics.length; i++){
      let t = props.topics[i];
      lis.push(<li key={t.id}>
        <a id={t.id} href={"/read/"+t.id} onClick={(event)=>{
          event.preventDefault();
          props.onChangeMode(Number(event.target.id));
        }}>{t.title}</a>
        </li>)
    } // 동적 생성 시에는 key prop을 가지고 있어야 함
    return <nav>
      <ol>
        {lis}
      </ol>
    </nav>
  }

  export default Nav;