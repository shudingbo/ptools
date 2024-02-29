



const eleCopyLocalDate = document.getElementById('idCopyLocalDateStr');
eleCopyLocalDate.style.visibility = 'hidden';
eleCopyLocalDate.addEventListener('click', function() {
    copyValue('localDateStr')
});

const eleCopyUtcDate = document.getElementById('idCopyUtcDateStr')
eleCopyUtcDate.style.visibility = 'hidden';
eleCopyUtcDate.addEventListener('click', function() {
    copyValue('utcDateStr')
});

const eleCopyTm = document.getElementById('idCopyOutTm')
eleCopyTm.style.visibility = 'hidden';
eleCopyTm.addEventListener('click', function() {
    copyValue('idOutTm')
});


document.getElementById('timestampInput').value = Date.now();


function judgeTimestamp(timestamp) {
    const length = timestamp.toString().length;
    if (length <= 10) {
        // 基于秒
        return Number(timestamp) * 1000; // 将秒转换为毫秒timestamp * 1000;
    } else if (length === 13) {
        // 基于毫秒
        return Number(timestamp);
    } else if (length > 13) {
        // 假设基于微秒
        return Math.floor(Number(timestamp) / 1000); // 将微秒转换为毫秒
    } else {
        return Number(timestamp);
    }
}


document.getElementById('convertBtn').addEventListener('click', function() {
    let timestamp = document.getElementById('timestampInput').value;
    let tm = judgeTimestamp(timestamp);
    document.getElementById('localDateStr').innerText = dateFormatT( false, new Date(tm) );
    document.getElementById('utcDateStr').innerText = dateFormatT( true, new Date(tm) );

    eleCopyLocalDate.style.visibility = 'visible';
    eleCopyUtcDate.style.visibility = 'visible';
});

document.getElementById('convertBtnStr2Tm').addEventListener('click', function() {
    let szTime = document.getElementById('timeInput').value;
    let date = Date.parse(szTime);
    document.getElementById('idOutTm').innerText = Math.floor(date / 1000);
    eleCopyTm.style.visibility = 'visible';
});


const eleGitProxyAddr = document.getElementById('idInputGithubProxyAddr')
eleGitProxyAddr.value = getGithubProxy();

document.getElementById('idDownGithub').addEventListener('click', function() {
    let szDownUrl = document.getElementById('idInputGithubAddr').value;
    szDownUrl = `https://mirror.ghproxy.com/${szDownUrl}`


    // 创建一个新的a元素  
    let element = document.createElement('a');  
    element.setAttribute('href', szDownUrl);  
    
    // 阻止链接的默认行为  
    element.style.display = 'none';  
    element.onclick = function() {  
        document.body.removeChild(event.target);  
    }  
    
    // 将元素添加到DOM中  
    document.body.appendChild(element);  
    
    // 模拟点击  
    element.click();  
});

document.getElementById('idChangeGithub').addEventListener('click', function() {
    let szProxyAddr = document.getElementById('idInputGithubProxyAddr').value;
    setGithubProxy( szProxyAddr );
});


function selectTab(index) {  
    // 移除所有Tab按钮的激活状态  
    var tabs = document.getElementsByClassName('tab');  
    for (var i = 0; i < tabs.length; i++) {  
      tabs[i].classList.remove('active');  
    }  

    // 激活选中的Tab按钮  
    tabs[index].classList.add('active'); 


    // 移除所有tab内容的激活状态  
    let tabContents = document.getElementsByClassName('tab-content');  
    for (let i = 0; i < tabContents.length; i++) {  
        tabContents[i].classList.remove('active');  
    }  

    // 激活选中的tab内容  
    var selectedTabContent = document.getElementById('tab' + (index + 1));  
    selectedTabContent.classList.add('active');  
}  

const eleTabs = document.querySelectorAll('.tab');  
  
// 遍历这些元素并为它们添加点击事件监听器  
eleTabs.forEach(function(tab) {  
    tab.addEventListener('click', function(event) {   
        selectTab(Number(tab.getAttribute('idx')));
        // 阻止事件的默认行为（如果需要）  
        event.preventDefault();  
    });  
}); 

selectTab(0);