Blockies
========

A tiny library for generating blocky identicons.

![Sample blockies image](sample.png "Blockies")

[**Demo page**](http://download13.github.io/blockies/)

Use
---

```javascript
import {toDataUrl} from 'blockies';

const img = new Image() ;
img.src = blockies.toDataUrl('0x7cB57B5A97eAbe94205C07890BE4c1aD31E486A8');

document.body.appendChild(img);
```


Goals
-----

No DOM dependencies, same rendering result as MEW v3.

Non Goals
---

Speed. Size.

License
-------

[WTFPL](http://www.wtfpl.net/)
