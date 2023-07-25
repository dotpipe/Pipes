
JavaScript DOM Handler for Routing and API

To donate please visit: https://paypal.me/pirodock

# Instructional Cheat Sheet
------------------
  *  only usage: onclick="pipes(this)"
  *  to begin using the PipesJS code in other ways than <dyn> <pipe> and <timed>.
  *  Usable DOM Attributes (almost all are optional
  *  upto x > 134,217,000 different configurations 
  *  with unlimited inputs/outputs):
  *  Attribute/Tag   |   Use Case
  *  -------------------------------------------------------------
  *  insert..........= return ajax call to this id
  *  ajax............= calls and returns the value file's output ex: <pipe ajax="foo.bar" query="key0:value0;" insert="someID">
  *  query...........= default query string associated with url ex: <anyTag query="key0:value0;key1:value2;" ajax="page.foo">
  *  &lt;download&gt;......= tag for downloading files ex: <download file="foo.zip" directory="/home/bar/"> (needs ending with slash)
  *  file............= filename to download
  *  directory.......= relative or full path of 'file'
  *  redirect........= "follow" the ajax call in POST or GET mode ex: <pipe ajax="foo.bar" redirect query="key0:value0;" insert="someID">
  *  &lt;link&gt;..........= tag for clickable link <link ajax="goinghere.html" query="key0:value0;">
  *  &lt;pipe&gt;..........= Tag (initializes on DOMContentLoaded Event) ex: <pipe ajax="foo.bar" query="key0:value0;" insert="someID">
  *  &lt;dyn&gt;...........= Automatic eventListening tag for onclick="pipes(this)" ex: <dyn ajax="foo.bar" query="key0:value0;" insert="someID">
  *  &lt;timed&gt;.........= Timed result refreshing tags (Keep up-to-date handling on page) ex: <timed ajax="foo.bar" delay="3000" query="key0:value0;" insert="someID">
  *  delay...........= delay between <timed> tag refreshes (required for <timed> tag) ex: see <timed>
  *  &lt;carousel&gt;......= Tag to create a carousel that moves every a timeOut() delay="x" occurs ex: <carousel ajax="foo.bar" file-order="foo.bar;bar.foo;foobar.barfoo" delay="3000" id="thisId" insert="thisId" height="100" width="100" boxes="8" style="height:100;width:800">
  *  file-order......= ajax to these files, iterating [0,1,2,3]%array.length per call (delimited by ';') ex: <pipe query="key0:value0;" file-order="foo.bar;bar.foo;foobar.barfoo" insert="someID">
  *  file-index......= counter of which index to use with file-order to go with ajax ex: <pipe ajax="foo.bar" query="key0:value0;" insert="someID">
  *  incrIndex.......= increment thru index of file-order (0 moves once) (default: 1) ex: <pipe ajax="foo.bar" incrIndex="2" file-order="foo.bar;bar.foo;foobar.barfoo" insert="someID">
  *  decrIndex.......= decrement thru index of file-order (0 moves once) (default: 1) ex: <pipe ajax="foo.bar" decrIndex="3" file-order="foo.bar;bar.foo;foobar.barfoo" insert="someID">
  *  set-attr........= attribute to set in target HTML tag ex: <pipe set-attr="value" ajax="foo.bar" query="key0:value0;" insert="thisOrSomeID">
  *  mode............= "POST" or "GET" (default: "POST") ex: <pipe mode="POST" set-attr="value" ajax="foo.bar" query="key0:value0;" insert="thisOrSomeID">
  *  data-pipe.......= name of class for multi-tag data (augment with pipe) *** obfuscated to be reoriented
  *  multiple........= states that this object has two or more key/value pairs use: states this is a multi-select form box
  *  remove..........= remove element in tag ex: <anyTag remove="someID;someOtherId;">
  *  display.........= toggle visible and invisible of anything in the value ex: <anyTag display="someID;someOtherId;">
  *  json............= returns a JSON file set as value *** obfuscated for now
  *  callback........= calls function set as attribute value
  *  headers.........= headers in CSS markup-style-attribute (delimited by '&') <any ajax="foo.bar" headers="foobar:boo&barfoo:barfoo;q:9&" insert="someID">
  *  form-class......= class name of devoted form elements
  *  mouse-over......= class name to work thru PipesJS' other attributes
  **** ALL HEADERS FOR AJAX are available. They will use defaults to
  **** go on if there is no input to replace them

     
# Modala v1.0

Modala is a JSON structure mapped HTML page where you can create templates, and offer more pages to users with less code. It's a run away hit if you just trust. Used with PipesJS it's as perfectly harmonizing as any other framework. Give it a go. It's at least worthy of a look. Just clone and use PipesJS. Affix the JSON of HTML to the function

modala({"key": "pair",...}, rootNode);

and run it on the page you want. Due to JS, all timer delays will be ignored. Each will run as a 3 second timer. The issue is that JS has only one thread to work with. So, they all need to run under that one thread. Therefore, for now, I'm bypassing the delay attribute. Soon we will have a init value for all timers. That said, you will need to make one value, at the upper point of the JSON state that you want your timers all under x milliseconds. This will be that state of all timers. And all timers will need to be native to PipesJS. (<timed>) 

At that point in Modala, PipesJS will have a future of being created in Modala. But this is far off. The Modala package, as it sets, is a rich and heavily blendable template. This is because you can write JSONs in such languages as PHP, and it can be given to the Modala interpretor. Very keen I think. 

Another problem with Modala, though, is that it doesn't create subpages from the function. It strictly sticks to the first page. Again, this is JS's fault and if I find another way, I will. But you can call and replace more than one DOM Node at a time. This is seen in test.php. The example shows more than one timed function going on. And as it is, the templates can work with changing data. So, no loss of utility really happening within Modalas huge exterior from nesting out of the box information when trying to scale for template use. That means we have a great ability to give you complete control over your coding. Your wish is in a command. It's a strong adversary compared to the others out there. With a tenth of the learning time. Honestly? it's as always HTML with more specs you know you need in a way you love. Thanks for choosing PipesJS. I appreciate it.

# PipesJS v4.0

New tag added this version. Also a callback function attribute. 

<timed delay="x"> where x is the milliseconds between each iteration of loading the Pipe. Like in Node, unless I'm wrong, (never used it) you can now use updated information consistently on your pages. Very easy to use.

callback = "foo" uses any data like json or other data to return your page's need. just set your function name as the value of callback and it shall be done ✅
	

# Pipes v3.6.6

The aggregate use of a cache class has been appended to the project! (yeay!) Now you can unroll multiple <pipe> tags and their filters by using this class with a JSON of filter arguments. The JSON can be named anything. In the $_GET you will have no extension of '.json' tho. It is plugged in automatically. If this is an issue, please flag it and I'll change it. As soon as I'm done with this, the $_GET and $_POST will be interchangable in the calls to their respective pages. Also, make sure your filters use JSON for more arbitrary information to come thru. Classes are often very large in importance to looks so that's it! There's better examples in testvid.html now, too. So go look into that, examine the cache.php class file. And that should be all, thanks!

# Pipes v3.6.2



Pipes may now be considered a viable and strategic option for the UI/UX developer. It is with great pleasure I introduce the <pipe></pipe> tag that incites automatic inclusion of what I call Filters. These are file getters that produce a script from their PipesJS attributes upon the DOMContentLoaded Event. It is also with more value, that I can kick off a purely JSON setup for pages. It is like includes, but it's a little better, you can have forms on the page take event parameters and use containing tags to write the rest of the page. This can be done with anything in the DOM with an Event on the tag of your choice, or an EventListener. That is now a huge part of this package's breadth. So you can rest assuredly put more to use.

	Coming Soon (expected by Spring 2023): multiple tags initiating at once via a controlled run thru an attribute like this ajax="first.php;second.html;etc-foo.bar"

I want to thank the hundreds of developers out there using this time saving software for their support, and realizing no man is perfect, and neither is code. Thank you thank you thank you, all so much.

# Threading for PHP via Pipes v2

Pipes v2

Threading mechanism is now included in package

citation: none

overwritten: none

origin opacity: nearly all languages except for PHP include threading.

I am well, To understand this, I will compensate for much within a time requisite to not let this be TL;DR from the start. I am wishing for this to be quite open of technological telemetry. Aside from some scapes, this will ride as a perfectly useable threading mechanism.

Using multiple files, held under requisite of number of recursions necessary, likely finding the need of 2, or at most the count of 3. This will all ride on current PHP background information and be without the use of external, or outside commands from the command line. We will not be using exec(), natively. these arguments are going to be rerouted through the recursions. And when they are used, they will be nested, and given back to the page being used dynamically to keep the information concurrent. This is a concurrent method.

With using a FLAG bit, like in any other threading situation, as a semaphore block, the threading will begin as it is to start with it's lock being off, but then revisited as 1 when the new semaphore is installed in the thread. By aligning with a single bit, a fully recognizable increment at this point, we can see which recursion we are settled into. This is on the client side. The client is unaware.

When we switch between recursions, the blocking begins to have its reasoning. A second bit of the FLAG byte, turned on, is used to recall the certitude of the thread's end. When all cases of the thread have been ergodic, then it will be off again. As we recede from the thread, all lanes have been recovered. This means, that if the thread is not destroyed, as told by the send FLAG bit, then the session will be considered corrupt, and the user will be logged out, to an error message.

Expansion:

Switching between session id's is the only determinable way to refocus on another state in the PHP engine, besides it's own enabled one. This can be used to create many functions which handle back doors and such. Relying on a focusable contract in the background, it would seem saving state is best. And using the different session id's to create foundation for file handling that would certainly otherwise be impossible would be latent and congested in its legacy prone decay. 

Assuming that the session ids is the same each time, there is the ability to create a PHP within PHP that handles file management. And it would certainly be just a proxy of controls and immediately a staple of the community. This SessPool of information, using databases, and temp files, as well as controlling routing and other management controls, would be elegant and understandable as a misfit entity. The language package, PASM would be best to use. It has all the continuity to use the restrictions and management tools herein cast out.

Recursion control:

When a thread line is being used and the first FLAG bit is made 1, then it will release back to the client-side system. Since this may or may not end the thread, the semaphore's second FLAG bit will need to be recognized as the most important factor to reveal if A. debugging is done correctly, and B. is the thread truly over. One would likely send back an array from a Pipes request. If not then it can be just returned in the last motion of the thread's work.

By passing that we are using the same session id, we can have control over the JSON file we must have produced to create the most detailed forms of security in our threading. This is a good way to create holes in the security of the computer if someone is sniffing what is going on in the JSON. So, to run it more securely, we can use chmod to turn on and turn off throughout use of write controls. I am positive this activated detail will give you an advantage over the hackers if they have not gotten to your account. Also, passing arbitrary information through POST calls will make the defintion of security easier for us to see and make ubiquitous. 

There is a reason to see if you have a semaphore still working on the thread. Any blocking done will keep the threading going. Whether the first FLAG bit is 0 or 1 we only see whether this portion, the active thread, is installed. The second FLAG bit is after cleanup routines. If the information is in JSON format (.json) the file associated to it must be created and given to the hard disk of the host. And when time is given back to the thread (via proxy through a wait timer in a second file.) it will recreate the system environment it had so it can unlink() the JSON and work with it. This keeps the file on the hard disk for a minimal time. chmod is still playing an important role, but likely of that of writing to. Deleting the file while reading it, will and should show of some course, that the file is under watchful reproach and be suspect to the host administrator. So a detailed service message to the admin will likely be necessary; as anyone trying to reveal a file that exists for milliseconds or maybe 10 seconds at most, will be something to be cautious of. If at all possible, these files are recommended as security flaws, judging the deference to the resource.

After all of this, to this point, we see that the articulation of the FLAG bits are to be as important to be commanded as the thread is. If the thread cannot be contacted for some time, the system will bring the user an error message. Where and how this is done is completely within the hands of the programmer and/or administrator. If there is an error during the unlink() command, then the work is to be cut off and left to a third FLAG bit, of whether to tell the system admin, or both user and system admin. 

# New Synopsis on working with Pipes

Pipes v3

Now we've come to a new way to understand and make readable the HTML markup. Thanks to the people over there at CSS, who made a lexicon of creating listing values for attributes in markup, PipesJS is now substantially easier to create with. Just plug in your needs to the pipes="name:value;" attribute in the tag you're using. Even headers can be used with it. Go right ahead and dive into this new ability. It is integral and does the work rapidly concerning new use cases. The old legacy code will remain until otherwise explained as to why there would be a reason to abandon it. So, in Pipes v3 you would also set up the list of changed headers to headers="method:get;". It is simply awesome. You may use any headers. If I'm not mistaken you can include ANY header you like. 

Have a nice day!
