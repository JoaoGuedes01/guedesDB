# guedesBD
## The best dynamic local database that exists (#fuck mysql)

[![N|Solid](https://cldup.com/dTxpPi9lDf.thumb.png)](https://nodesource.com/products/nsolid)

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

guedesDB is a lightweight, to the point, no bullshit local database for node projects. You also have the option to share your data among multiple projects.

## Features

- Setup up database inside your project or globally for all projects;
- Create your own objects and save them in .gds format;
- Read all objects for your created types;
- Read an object by ID for your created types;
- Read an object by a specific attribute and its value for your created types;
- Update any object with its id(yes that includes new parameters if you feel like it) for all your created types;
- Delete any object with its id for all yout created types;
- Dynamically counted ids for maximum certainty that all ids are different

## Installation

guedesDB requires [Node.js](https://nodejs.org/) v10+ to run.

Install the dependencies and devDependencies and start the server.

```sh
cd [yourproject]
npm i guedesdb
```

Create your config file("local" for locally hosting the DB inside project or "global" for hosting the DB globally for shared use between projects)

```sh
{
    "storage": "local"
}
```

After calling guedesdb from the package you need to set it up with your config file...

```sh
const guedesDB = require('guedesDB');
guedesDB.SetupFolders(config);
```

And you're done, now you can use all of the methods guedesDB has to offer

## Methods

guedesDB is currently extended with the following methods.
Instructions on how to use them in your own application are linked below.

| Plugin | README | Example
| ------ | ------ | ------ |
| SetupFolders | SetupFolders([config file]) | SetupFolders(./config.json);
| GetAllObjects | GetAllObjects([your type]) | GetAllObjects('users');
| GetByID | GetByID([your type],[id]); | GetByID('users',0);
| GetByAttribute | GetByAttribute([your type],[your attribute],[value]); | GetByAttribute('users',name,'jonaspistolas');
| createObject | createObject([your type],[your object]); | createObject('users',{name:'jonas',surname:'pistolas'});
| UpdateObject | UpdateObject([your type],[id],[your object] | UpdateObject('users',0,{name:'jonas2',surname:'pistolas2'});
| DeleteObject | DeleteObject([your type],[id]); | DeleteObject('users',0);


## License

MIT

**Fuck you Rui**

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)

   [dill]: <https://github.com/joemccann/dillinger>
   [git-repo-url]: <https://github.com/joemccann/dillinger.git>
   [john gruber]: <http://daringfireball.net>
   [df1]: <http://daringfireball.net/projects/markdown/>
   [markdown-it]: <https://github.com/markdown-it/markdown-it>
   [Ace Editor]: <http://ace.ajax.org>
   [node.js]: <http://nodejs.org>
   [Twitter Bootstrap]: <http://twitter.github.com/bootstrap/>
   [jQuery]: <http://jquery.com>
   [@tjholowaychuk]: <http://twitter.com/tjholowaychuk>
   [express]: <http://expressjs.com>
   [AngularJS]: <http://angularjs.org>
   [Gulp]: <http://gulpjs.com>

   [PlDb]: <https://github.com/joemccann/dillinger/tree/master/plugins/dropbox/README.md>
   [PlGh]: <https://github.com/joemccann/dillinger/tree/master/plugins/github/README.md>
   [PlGd]: <https://github.com/joemccann/dillinger/tree/master/plugins/googledrive/README.md>
   [PlOd]: <https://github.com/joemccann/dillinger/tree/master/plugins/onedrive/README.md>
   [PlMe]: <https://github.com/joemccann/dillinger/tree/master/plugins/medium/README.md>
   [PlGa]: <https://github.com/RahulHP/dillinger/blob/master/plugins/googleanalytics/README.md>
