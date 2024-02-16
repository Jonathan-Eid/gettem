// Animation source
// https://codepen.io/rudtjd2548/pen/qBpVzxP

import { useEffect } from "react"
declare global {
    interface Window { githubCard: any; }
}
function useGithubCard(github:any){

    useEffect( () => {
  
        (async () => {
            var base: any = "";

        var i, count = 0;

        var metas = document.getElementsByTagName('meta');
        var client_url: any, client_id: any, client_secret: any, client_theme: any;
        for (i = 0; i < metas.length; i++) {
            var n = metas[i].getAttribute('name');
            var c = metas[i].getAttribute('content');
            if (n === 'gc:url') {
            client_url = c;
            } else if (n === 'gc:base') {
            base = c;
            } else if (n === 'gc:client-id') {
            client_id = c;
            } else if (n === 'gc:client-secret') {
            client_secret = c;
            } else if (n === 'gc:theme') {
            client_theme = c;
            }
        }

        function queryclass(name: any) {
            if (document.querySelectorAll) {
            return document.querySelectorAll('.' + name);
            }
            var elements = document.getElementsByTagName('div');
            var ret = [];
            for (i = 0; i < elements.length; i++) {
            if (~elements[i].className.split(' ').indexOf(name)) {
                ret.push(elements[i]);
            }
            }
            return ret;
        }

        function querydata(element: any, name: any) {
            return element.getAttribute('data-' + name);
        }

        function heighty(iframe: any) {
            if (window.addEventListener) {
            window.addEventListener('message', function(e) {
                if (iframe.id === e.data.sender) {
                iframe.height = e.data.height;
                }
            }, false);
            }
        }

        function render(card: any, cardurl?: any) {
            cardurl = cardurl || client_url;
            if (!cardurl) {
            var theme = querydata(card, 'theme') || client_theme || 'default';
            cardurl = base + 'github-cards/' + theme + '.html';
            }
            var user = querydata(card, 'user');
            var repo = querydata(card, 'repo');
            var github = querydata(card, 'github');
            if (github) {
            github = github.split('/');
            if (github.length && !user) {
                user = github[0];
                repo = repo || github[1];
            }
            }
            if (!user) {
            return;
            }

            count += 1;
            var width = querydata(card, 'width');
            var height = querydata(card, 'height');
            var target = querydata(card, 'target');

            var key = querydata(card, 'client-id') || client_id;
            var secret = querydata(card, 'client-secret') || client_secret;

            var identity = 'ghcard-' + user + '-' + count;

            var iframe: any = document.createElement('iframe');
            iframe.setAttribute('id', identity);
            iframe.setAttribute('frameborder', 0);
            iframe.setAttribute('scrolling', 0);
            iframe.style.zIndex=querydata(card, 'zindex');
            iframe.setAttribute('allowtransparency', true);

            var url = cardurl + '?user=' + user + '&identity=' + identity;
            if (repo) {
            url += '&repo=' + repo;
            }
            if (target) {
            url += '&target=' + target;
            }
            if (key && secret) {
            url += '&client_id=' + key + '&client_secret=' + secret;
            }
            iframe.src = url;
            iframe.width = width || Math.min(card.parentNode.clientWidth || 400, 400);
            if (height) {
            iframe.height = height;
            }
            heighty(iframe);
            card.parentNode.replaceChild(iframe, card);
            return iframe;
        }

        var cards = queryclass('github-card');
        for (i = 0; i < cards.length; i++) {
            render(cards[i]);
        }

        
        if (window.githubCard) {
            window.githubCard.render = render;
        }
        })()
      }, [github]) 

}

export default useGithubCard