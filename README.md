# Boost2html

Convert Boostnote snippets to web pages and push it to git automatically.

Demo: [http://www.lazyboy.site/codes](http://www.lazyboy.site/codes)



## how to use

#### 1、Get it from github

```shell
git clone https://github.com/xbotao/Boost2html.git
cd Boost2html/
npm install
```

#### 2、change config in `[_config.yml]`

```
name: boost2html
discription: THIS IS GENERATE BY boost2html FROM boostnote's' SNIPPETS
autor: lazyboy
basePath: /codes
snippetTitle: Snippets
BoostStorage: X:/code/
email: xbotao2014@gmail.com
website: http://www.lazyboy.site
sitename: lazyboy.site
since: 2017
```

#### 3、 init git manually

```bash
cd output
git init
git remote add origin git@xxxxxxxxx.git
```

#### 4、

```
node index.js
```

