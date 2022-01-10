const showImg = document.getElementsByClassName('img')
const ShowName = document.getElementsByClassName('name')
const ShowGenre = document.getElementsByClassName('genres')
const ShowLanguage = document.getElementsByClassName('language')
const ShowPremiered = document.getElementsByClassName('premiered')
const ShowOfSite = document.getElementsByClassName('official-site')
const ShowSummary = document.getElementsByClassName('summary')

let comments = []
if (localStorage.getItem('comments')) {
    comments = JSON.parse(localStorage.getItem('comments'))
}

fetch('https://api.tvmaze.com/search/shows?q=popular', { mode: 'cors' })
    .then(response => response.json())
    .then((response) => {
        for (let i = 0; i < response.length; i++) {
            if (!response[i].show.image) {
                showImg[i].src = response[i + 1].show.image.original;
            } else {
                showImg[i].src = response[i].show.image.original;
            }
            ShowName[i].innerText = response[i].show.name;
            if (!response[i].show.genres) {} else {
                ShowGenre[i].innerText = response[i].show.genres
            }
            ShowLanguage[i].innerText = response[i].show.language;
            ShowPremiered[i].innerText = response[i].show.premiered;
            ShowOfSite[i].innerText = response[i].show.officialSite;
            ShowSummary[i].innerHTML = response[i].show.summary;
        }
        console.log(response)
    })
    .catch(err => console.log(err))


let result = [];

document.getElementsByClassName('searchBtn')[0].addEventListener('click', (event) => {
    event.preventDefault();
    if (document.getElementsByTagName('input')[0].value === '') {
        alert('Please enter a show name!')
    } else {
        fetch(`https://api.tvmaze.com/search/shows?q=${document.getElementsByTagName('input')[0].value}`, { mode: 'cors' })
            .then(response => response.json())
            .then(response => {
                result = [];
                for (let z = 0; z < response.length; z++) {
                    result.push(`<div class="shows">
            <img class="img">
            <div class="information">
                <div class="dates">
                    <h1>Name:
                    </h1><span class="name"></span>
                </div>
                <div class="dates">
                    <h1>Genres:
                    </h1><span class="genres"></span>
                </div>
                <div class="dates">
                    <h1>Language:
                    </h1><span class="language"></span>
                </div>
                <div class="dates">
                    <h1>Premiered:
                    </h1><span class="premiered"></span>
                </div>
                <div class="dates">
                    <h1>Official site:
                    </h1><span class="official-site"></span>
                </div>
                <div class="dates">
                    <h1>Summary:
                    </h1><span class="summary"></span>
                </div>
            </div>
            <div><button class="comment">Comments</button></div>
            </div>
            <div class="comments"><div class="oldComments"><div class="headerComment"><h1>User's name</h1><h1>User's comment(s)</h1></div></div><textarea type="text" class="commentBox"  placeholder="Leave a comment"></textarea>
            <form class="formComment">
                <input type="text" class="userName" placeholder="Enter your name">
                <button class="submitComment">Submit</button>
            </form><i class="fas fa-times-circle"></i></div>
            `)
                }



                document.getElementsByClassName('resultDiv')[0].innerHTML = result;
                const showImg = document.getElementsByClassName('resultDiv')[0].getElementsByClassName('img')
                const ShowName = document.getElementsByClassName('resultDiv')[0].getElementsByClassName('name')
                const ShowGenre = document.getElementsByClassName('resultDiv')[0].getElementsByClassName('genres')
                const ShowLanguage = document.getElementsByClassName('resultDiv')[0].getElementsByClassName('language')
                const ShowPremiered = document.getElementsByClassName('resultDiv')[0].getElementsByClassName('premiered')
                const ShowOfSite = document.getElementsByClassName('resultDiv')[0].getElementsByClassName('official-site')
                const ShowSummary = document.getElementsByClassName('resultDiv')[0].getElementsByClassName('summary');


                for (let i = 0; i < response.length; i++) {
                    if (response[i].show.image) {
                        showImg[i].src = response[i].show.image.original;
                    } else { showImg[i].src = 'broken.png' }
                    ShowName[i].innerText = response[i].show.name;
                    if (!response[i].show.genres) {} else {
                        ShowGenre[i].innerText = response[i].show.genres
                    }
                    ShowLanguage[i].innerText = response[i].show.language;
                    ShowPremiered[i].innerText = response[i].show.premiered;
                    ShowOfSite[i].innerText = response[i].show.officialSite;
                    ShowSummary[i].innerHTML = response[i].show.summary;
                }
                console.log(response)
            })
            .then(() => {
                let show_name;
                const commentBtn = [document.getElementsByClassName('comment')][0]
                for (let index = 0; index < commentBtn.length; index++) {
                    const element = commentBtn[index];
                    element.addEventListener('click', () => {
                        if(document.getElementsByClassName('comments')[index].style.display === "none") {
                        document.getElementsByClassName('comments')[index].style.display = "flex";
                        const submitBtn = document.getElementsByClassName('submitComment')[index];
                        const cancelBtn = document.getElementsByClassName('fa-times-circle')[index];
                        submitBtn.addEventListener('click', (event) => {
                            event.preventDefault();
                            if (!(document.getElementsByClassName('commentBox')[index].value === '' || document.getElementsByClassName('userName')[index].value === '')) {
                                show_name = document.getElementsByClassName('resultDiv')[0].getElementsByClassName('shows')[index].getElementsByClassName('information')[0].getElementsByClassName('name')[0].textContent;
                                let commentToLocalStrg = {
                                    showname: show_name,
                                    username: document.getElementsByClassName('userName')[index].value,
                                    comment: document.getElementsByClassName('commentBox')[index].value
                                }
                                comments.push(commentToLocalStrg);
                                localStorage.setItem('comments', JSON.stringify(comments))
                                document.getElementsByClassName('oldComments')[index].innerHTML = '';
                                for (let k = 0; k < comments.length; k++) {
                                    if (comments[k].showname === document.getElementsByClassName('resultDiv')[0].getElementsByClassName('shows')[index].getElementsByClassName('information')[0].getElementsByClassName('name')[0].textContent) {
                                        let oldDiv = document.createElement('div');
                                        oldDiv.classList.add('oldDiv');
                                        let h1 = document.createElement('h1');
                                        h1.classList.add('commenth1');
                                        h1.innerHTML = comments[k].username;
                                        let p = document.createElement('p');
                                        p.classList.add('commentp');
                                        p.innerHTML = comments[k].comment;
                                        let oldCommentDiv = document.getElementsByClassName('oldComments')[index];
                                        oldDiv.appendChild(h1)
                                        oldDiv.appendChild(p)
                                        oldCommentDiv.appendChild(oldDiv)
                                    }
                                }
                            } else {
                                alert('Please out these fields')
                            }
                        })
                        cancelBtn.addEventListener('click', () => {
                            document.getElementsByClassName('comments')[index].style.display = "none";
                        })
                        for (let k = 0; k < comments.length; k++) {
                            if (comments[k].showname === document.getElementsByClassName('resultDiv')[0].getElementsByClassName('shows')[index].getElementsByClassName('information')[0].getElementsByClassName('name')[0].textContent) {
                                let oldDiv = document.createElement('div');
                                oldDiv.classList.add('oldDiv');
                                let h1 = document.createElement('h1');
                                h1.classList.add('commenth1');
                                h1.innerHTML = comments[k].username;
                                let p = document.createElement('p');
                                p.classList.add('commentp');
                                p.innerHTML = comments[k].comment;
                                let oldCommentDiv = document.getElementsByClassName('oldComments')[index];
                                oldDiv.appendChild(h1)
                                oldDiv.appendChild(p)
                                oldCommentDiv.appendChild(oldDiv)
                            }
                        }
                       }
                    })
                }
            })
            .catch(err => {
                alert('Show not found or internet disconnected');
                console.log(err)
            })
    }
})
