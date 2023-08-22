const titleContainer = document.querySelector(".title-container");
const titleBtn = document.querySelector("#startBtn");
const questionContainer = document.querySelector('.question-container');
const question = document.querySelector('#question');
const type = document.querySelector('#type');
const aBtn = document.querySelector("#a");
const bBtn = document.querySelector('#b');
const EI = document.querySelector('#EI');
const SN = document.querySelector('#SN');
const TF = document.querySelector("#TF");
const JS = document.querySelector("#JP");
const pro = document.querySelector('.progress-bar');
const intro = document.querySelector('#intro');
const MBTI = document.querySelector('#MBTI');
const explain = document.querySelector('#explain');
const image = document.querySelector('#result-img');
const resultContainer = document.querySelector('.result-container');
const index = document.querySelector('#index');

const q = {
    1: {
        title: "1. 친구와 싸웠다, 나는 해결 방식은?", 
        type: "EI", 
        A: "얼른 대화하면서 풀어나가자!", 
        B: "나는 먼저 생각할 시간이 필요해.. 기다려줘"
    },
    2: {
        title: "2. 싸우는 도중, 친구의 상처 받는 말...", 
        type: "TF", 
        A: "그 말에 대한 반박이 우선이다", 
        B: "내 마음의 상처가 우선이다"
    },
    3: {
        title: "3. 이해 안되는 친구의 말에 나는?", 
        type: "SN", 
        A: "하.. 대체 왜? 일단 알겠어",
        B: "아니 대체 왜? 일단 알려줘"
    },
    4: {
        title: "4. 상대의 거슬리는 말, 나의 반응은?", 
        type: "JP", 
        A: "오케이, 너 그렇게 얘기했다 이거지? 차례대로 반박함", 
        B: "뭐라고? 너 무슨 말을.. 당장 되받아 침"
    },
    5: {
        title: "5. 싸울 때 나의 성향은?", 
        type: "JP", 
        A: "말하기 전, 상대의 답변을 미리 예측한다", 
        B: "일단 상대의 답변부터 듣는다"},
    6: {
        title: "6. 다른 친구와 싸우고 와서 나에게 썰을 푸는 영희, <br>영희도 잘못한 부분이 있는 것 같다. 이때 나의 반응은?", 
        type: "TF", 
        A: "(철수가 잘못했네..) 근데 너도 잘못한 것 같은데?", 
        B: "(영희도 잘못했지만..) 진짜 짜증났겠다 철수 왜 그래?"
    },
    7: {
        title: "7. 나는 너가 싫어! 라는 말을 들었다", 
        type: "EI", 
        A: "야, 너 뭐라고 했냐? 일로 와봐", 
        B: "(쟤 뭐냐? 누군 좋니?) 그냥 무시한다"
    },
    8: {
        title: "8. 친구와의 갈등 상황, 내가 더 자주 하는 말은?", 
        type: "SN", 
        A: "그런 의미로 얘기한 거 아니야", 
        B: "나는 그 말이 이렇게 느껴져"
    },
    9: {
        title: "9. 싸울 때 더 중요한 것은?", 
        type: "TF", 
        A: "상대가 잘못 행동한 '사실'이 중요하다", 
        B: "행동으로 인해 내가 느낀 '감정'이 중요하다"
    },
    10: {
        title: "10. 내가 더 자주 이용하는 해결 방식은?", 
        type: "EI", 
        A: "답답해 지금 당장 풀고 집에 가자", 
        B: "지금 말 못하겠어 (1시간 뒤) 카톡으로 설명한다"},
    11: {
        title: "11. 저녁 식사 전 갑작스러운 싸움.. 나의 머릿속엔?", 
        type: "JP", 
        A: "화해와 저녁 효율적인 해결을 위해 시뮬레이션 돌림", 
        B: "일단 지금 싸움부터, 저녁은 나중에~"
    },
    12: {
        title: "12. 친구와 화해한 날 잠 들기 전, 나는?", 
        type: "SN", 
        A: "잘 화해하고 끝내서 너무 다행이다", 
        B: "아까는 내가 왜 그런 말을... 앞으로 그러지 말자..!"
    }
};

const result = {
    ISFP: {
        char: "비둘기", 
        intro: "평화의 상징,",
        explain: `싸움을 싫어하는 평화주의자 타입의 당신!<br>
        갈등 상황을 피하려는 성향으로 누군가와 부딪히는 상황을 아주 싫어해요.<br> 
        싸움은 일단 피곤하고 귀찮아서 웬만하면 마음 속으로 생각하고 지나가버려요.<br>
        친구의 말에 상처 받아도 겉으로 표현하지 않고 왜 그런 말과 행동을 했을지<br>
        혼자 속으로 이해하고 삭히다가 눈물이 나오기도 해요.<br> 
        이해심이 깊은 당신, 혹시 참고있는 건 아닌가요?`, 
        img: "1.png"
    },
    INFP: {
        char: "비둘기", 
        intro: "평화의 상징,", 
        explain: `싸움을 싫어하는 평화주의자 타입의 당신!<br>
        갈등 상황을 피하려는 성향으로 누군가와 부딪히는 상황을 아주 싫어해요.<br> 
        싸움은 일단 피곤하고 귀찮아서 웬만하면 마음 속으로 생각하고 지나가버려요.<br>
        친구의 말에 상처 받아도 겉으로 표현하지 않고 왜 그런 말과 행동을 했을지<br>
        혼자 속으로 이해하고 삭히다가 눈물이 나오기도 해요.<br> 
        이해심이 깊은 당신, 혹시 참고있는 건 아닌가요?`,  
        img: "1.png"
    },
    INFJ: {
        char: "옐로우 카드", 
        intro: "그 선 넘으면 정색이야 beep,",
        explain: `공중도덕와 예의를 중요시하는 당신!<br>
        사려깊은 성격의 당신은 사람들은 왜 선을 지키려고 노력하지 않을까 생각해요.<br>
        상대방이 자신이 정해놓은 선을 넘는 것에 대해 민감해요.<br>
        인내심 많고 친절한 당신이지만, 사람들은 당신의 속마음을 알기 어려워해요.<br>
        감수성이 풍부하고 걱정이 많아서 혼자 생각하며 끙끙 앓기도 해요.<br>
        매번 참을 인을 긋는 당신, 조금은 마음을 열어보는 건 어떨까요?`, 
        img: "2.png"
    },
    ISFJ: {
        char: "옐로우 카드", 
        intro: "그 선 넘으면 정색이야 beep,",
        explain: `공중도덕와 예의를 중요시하는 당신!<br>
        사려깊은 성격의 당신은 사람들은 왜 선을 지키려고 노력하지 않을까 생각해요.<br>
        상대방이 자신이 정해놓은 선을 넘는 것에 대해 민감해요.<br>
        인내심 많고 친절한 당신이지만, 사람들은 당신의 속마음을 알기 어려워해요.<br>
        감수성이 풍부하고 걱정이 많아서 혼자 생각하며 끙끙 앓기도 해요.<br>
        매번 참을 인을 긋는 당신, 조금은 마음을 열어보는 건 어떨까요?`,  
        img: "2.png"
    },
    ESFP: {
        char: "투머치토커", 
        intro: "난 네가 좋을 뿐이라고,",
        explain: `말이 많고 사람들을 좋아하는 당신!<br>
        성격이 급하고 별 거 아닌 일에도 흥분하기도 해요.<br>
        리액션이 큰 편으로 의도치 않은 상처를 줄 때도 받을 때도 있어요.<br>
        사소한 말에 쉽게 상처받기도 하지만 사람들과 어울리는 걸 좋아하는 당신은<br>
        진심 어린 사과를 통해 금방 털어내려고 노력하고 웃어요.<br>
        제법 귀여운 당신, 사람들이 좋아하지 않을 수 없어요><`,  
        img: "3.png"
    },
    ENFP: {
        char: "투머치토커", 
        intro: "난 네가 좋을 뿐이라고,",
        explain: `말이 많고 사람들을 좋아하는 당신!<br>
        성격이 급하고 별 거 아닌 일에도 흥분하기도 해요.<br>
        리액션이 큰 편으로 의도치 않은 상처를 줄 때도 받을 때도 있어요.<br>
        사소한 말에 쉽게 상처받기도 하지만 사람들과 어울리는 걸 좋아하는 당신은<br>
        진심 어린 사과를 통해 금방 털어내려고 노력하고 웃어요.<br>
        제법 귀여운 당신, 사람들이 좋아하지 않을 수 없어요><`, 
        img: "3.png"
    },
    ESFJ: {
        char: "프로잔소리러", 
        intro: "평화를 위해서 내가 나선다,",
        explain: `세상의 평화를 위해서 싸우는 당신!<br>
        다른 사람의 일을 내 일이라고 생각하고 도와주는 세심함을 가지고 있어요.<br>
        가끔 상대방을 무조건적으로 도와주려다 배려를 당연하게 생각하는 사람들에게 상처받기도 해요.<br>
        의외로 잔걱정이 많고 눈치도 빠른 편이에요.<br>
        도덕과 예의를 중요시하는 성향으로 말다툼이 일어나면 정의롭게<br>
        할 말을 하는 당신, 제법 멋져요!!`, 
        img: "4.png"
    },
    ENFJ: {
        char: "프로잔소리러", 
        intro: "평화를 위해서 내가 나선다,",
        explain: `세상의 평화를 위해서 싸우는 당신!<br>
        다른 사람의 일을 내 일이라고 생각하고 도와주는 세심함을 가지고 있어요.<br>
        가끔 상대방을 무조건적으로 도와주려다 배려를 당연하게 생각하는 사람들에게 상처받기도 해요.<br>
        의외로 잔걱정이 많고 눈치도 빠른 편이에요.<br>
        도덕과 예의를 중요시하는 성향으로 말다툼이 일어나면 정의롭게<br>
        할 말을 하는 당신, 제법 멋져요!!`, 
        img: "4.png"
    },
    ISTP: {
        char: "프로무관심러",
        intro: "엥? 너네 언제 싸웠어?,", 
        explain: `평화보다는 자유를 사랑하는 당신!<br>
        평소 남에게 관심이 없고 독립적인 편으로 간섭 받는 것을 싫어해요.<br>
        마이웨이 성향이 강해서 누가 내 욕을 하든 과하게 신경 쓰지 않아요.<br> 
        싸움 자체를 귀찮고 피곤하게 여겨서 싸움을 모른 척하기도 해요.<br>
        공감 능력이 조금 떨어지는 편으로 싸움할 때 논리적인 편이에요.<br>
        머릿속에 논리와 사고가 가득한 당신, 가끔 주위를 둘러봐요!`, 
        img: "5.png"
    },
    INTP: {
        char: "프로무관심러", 
        intro: "엥? 너네 언제 싸웠어?,",
        explain: `평화보다는 자유를 사랑하는 당신!<br>
        평소 남에게 관심이 없고 독립적인 편으로 간섭 받는 것을 싫어해요.<br>
        마이웨이 성향이 강해서 누가 내 욕을 하든 과하게 신경 쓰지 않아요.<br> 
        싸움 자체를 귀찮고 피곤하게 여겨서 싸움을 모른 척하기도 해요.<br>
        공감 능력이 조금 떨어지는 편으로 싸움할 때 논리적인 편이에요.<br>
        머릿속에 논리와 사고가 가득한 당신, 가끔 주위를 둘러봐요!`,  
        img: "5.png"
    },
    ISTJ: {
        char: "프로지적러", 
        intro: "팩트가 중요해,",
        explain: `사실을 중요시 하는 논리적인 당신!<br>
        감정의 호소보다 원리원칙과 사실 여부를 중요하게 생각해요.<br>
        싸울 땐 싸우더라도 일의 결과가 좋은 게 우선이에요.<br>
        상대방이 뭔가를 틀리면 지적하고 더 사실적인 내용으로 바꾸고 싶어해요.<br>
        다투거나 대화를 할 때 기필코 이겨야 하는 성향이에요.<br>
        꽤 말수가 적은 당신, 팩트폭행러로 인정해요!`, 
        img: "6.png"
    },
    INTJ: {
        char: "프로지적러", 
        intro: "팩트가 중요해,",
        explain: `사실을 중요시 하는 논리적인 당신!<br>
        감정의 호소보다 원리원칙과 사실 여부를 중요하게 생각해요.<br>
        싸울 땐 싸우더라도 일의 결과가 좋은 게 우선이에요.<br>
        상대방이 뭔가를 틀리면 지적하고 더 사실적인 내용으로 바꾸고 싶어해요.<br>
        다투거나 대화를 할 때 기필코 이겨야 하는 성향이에요.<br>
        꽤 말수가 적은 당신, 팩트폭행러로 인정해요!`,  
        img: "6.png"
    },
    ESTP: {
        char: "프로싸움러", 
        intro: "난 절대 참지 않지,",
        explain: `솔직하고 꽤나 공격적인 당신!<br>
        순발력이 좋고 직설적인 편으로 싸우고 난 뒤 뒤끝이 없어요.<br>
        가끔 필터링 없이 말하지만 재치 있고 재미있어요.<br>
        무자비한 팩트폭행으로 말싸움을 할 때 상대방을 열 받게 만들 수 있어요.<br>
        상대방의 말이 맞다고 생각이 드는 경우 쿨하게 받아들여요.<br>
        싸움을 진정으로 즐길 줄 아는 당신, 생각보다 귀여워요ㅎ`, 
        img: "7.png"
    },
    ENTP: {
        char: "프로싸움러", 
        intro: "난 절대 참지 않지,",
        explain: `솔직하고 꽤나 공격적인 당신!<br>
        순발력이 좋고 직설적인 편으로 싸우고 난 뒤 뒤끝이 없어요.<br>
        가끔 필터링 없이 말하지만 재치 있고 재미있어요.<br>
        무자비한 팩트폭행으로 말싸움을 할 때 상대방을 열 받게 만들 수 있어요.<br>
        상대방의 말이 맞다고 생각이 드는 경우 쿨하게 받아들여요.<br>
        싸움을 진정으로 즐길 줄 아는 당신, 생각보다 귀여워요ㅎ`,  
        img: "7.png"
    },
    ESTJ: {
        char: "전쟁의 신",
        intro: "싸움도 전략적으로,", 
        explain: 
        `리더십의 대가인 당신!<br>
        매사에 냉철하고 객관적인 성향으로 감정에 잘 휘둘리 않아서<br> 
        갈등 상황에 처하더라도 감정 이입을 잘 하지 않는 편이에요.<br>
        논리적인 편으로 허를 찌르는 팩폭을 잘하지만 화가 나면 감정적으로 말하기도 해요.<br>
        승부욕이 강해서 논쟁에서 지는 것을 굉장히 싫어해요.<br>
        철두철미하고 강해보이는 당신, 속마음은 여린 거 다 알아요~!`, 
        img: "8.png"
    },
    ENTJ: {
        char: "전쟁의 신", 
        intro: "싸움도 전략적으로,",
        explain: 
        `리더십의 대가인 당신!<br>
        매사에 냉철하고 객관적인 성향으로 감정에 잘 휘둘리 않아서<br> 
        갈등 상황에 처하더라도 감정 이입을 잘 하지 않는 편이에요.<br>
        논리적인 편으로 허를 찌르는 팩폭을 잘하지만 화가 나면 감정적으로 말하기도 해요.<br>
        승부욕이 강해서 논쟁에서 지는 것을 굉장히 싫어해요.<br>
        철두철미하고 강해보이는 당신, 속마음은 여린 거 다 알아요~!`,
        img: "8.png"
    },
};

let num = 1;
let mbti = "";

titleBtn.addEventListener('click', () => {
    titleContainer.style.WebkitAnimation = "fadeOut 1s";
    titleContainer.style.animation = "fadeOut 1s";
    setTimeout(() => {
        questionContainer.style.WebkitAnimation = "fadeIn 1s";
        questionContainer.style.animation = "fadeIn 1s";
        setTimeout(() => {
            titleContainer.style.display = 'none';
            questionContainer.style.display = 'block';
        }, 450)
    }, 450)
    
    updateQuestion()

})

aBtn.addEventListener('click', () => {
    switch(type.textContent){
        case "EI":
            EI.value = Number(EI.value)+1;
            //let e = parseInt(EI.value);
            //EI.setAttribute('value', e+1);
            break
        case "SN":
            SN.value = Number(SN.value)+1;
            //let s = parseInt(SN.value);
            //SN.setAttribute('value', s+1);
            break
        case "TF":
            TF.value = Number(TF.value)+1;
            break
        case "JP":
            JP.value = Number(JP.value)+1;
            break
    }
    updateQuestion()

})

bBtn.addEventListener('click', () => {
     updateQuestion()
})

function updateQuestion(){

    if (num === 13 ){
        questionContainer.style.WebkitAnimation = "fadeOut 1s";
        questionContainer.style.animation = "fadeOut 1s";
        setTimeout(() => {
            resultContainer.style.WebkitAnimation = "fadeIn 1s";
            resultContainer.style.animation = "fadeIn 1s";
            setTimeout(() => {
                questionContainer.style.display = 'none';
                resultContainer.style.display = 'block';
            }, 450)
        });

        (Number(EI.value) > 2 ? mbti+="E" : mbti+="I");
        (Number(SN.value) > 2 ? mbti+="S" : mbti+="N");
        (Number(TF.value) > 2 ? mbti+="T" : mbti+="F");
        (Number(JP.value) > 2 ? mbti+="J" : mbti+="P");


        intro.innerHTML = result[mbti].intro;
        MBTI.innerHTML = result[mbti].char;
        explain.innerHTML = result[mbti].explain;

        //var imgURL = 'img/' +

        image.setAttribute("src", 'img/' + result[mbti].img);

        return;
    }

    pro.style.width = (100/12) * (num-1) +'%';
    index.innerHTML = num + '/12';

    question.innerHTML = q[num].title
    type.innerHTML = q[num].type
    aBtn.innerHTML = q[num].A
    bBtn.innerHTML = q[num].B
    num++
}
