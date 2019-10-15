# Install & use

`npm install`

`npm start` To run dev (allows you to render markup that should be missing from Production), sets NODE_ENV='development'

`npm run build` To run production (preview of page will look bad but only becaause some maarkup won't be generated as you will need to manually add this in to marketo's landing page under marketing activities in the WYSIWYG, more on this later.), sets NODE_ENV='production'

## Overview of the project

This project is a flat file compiler project using panini to create AWS landing pages.

You will have a few main folders you will work in:

- **./src/pages/pages**
  - Here you will create a new `.html` file that will contain the components of the page you will build, the contents of this file get injected in the `{{> body}}` tag in the layout template. At the top of pages, we also declare 'front matter' variables to declare the live src for the css and javascript on Marketo. Note that these src's will only be injected into the template when NODE_ENV='production', it will instead use `../css/{{pageName}}.css` and `../js/main-on-aws.js`. Please grab the urls for the live css and js after you have uploaded your compiled files to Marketo.
  - 
	```
	---
	pageName: win-on-aws
	stylesheet: https://pages.awscloud.com/rs/112-TZM-766/images/win-on-aws.css
	javascript: https://pages.awscloud.com/rs/112-TZM-766/images/main-on-aws.js
	---
	```
- **./src/layouts**
  - Here is where you will create a boiler plate that contains `{{> body}}` and any other variables or partials you create to act as a template for your pages. All pages you make will use the 'default' template by... default lol, but if you wish to use an alternate template then in your pages, use front matter at the very top of yout page to declare a layout variable with the value equal to the file name of the html layout (minus the .ext). Below is an example of front matter in a 'page' file declaring the layout template to use:
  - 
	```
	---
	var: some-var
	layout: another-template
	---
	```
  - Note that the 'var' in the example can be used as `{{var}}` in your page or bubble up to the template file and it's values will always be parsed as a string (no quote marks are needed)
- **./src/partials**
  - While partials are currently not being used, you may if you want, create a html file in the partials folder, usual practice is to name it `_partial-name.html` (underscore to denote it is a partial and not just a mere variable). then to use it in a page or template: `{{> _partial-name}}`.
  - Note that you may also pass 'props' to the partial, let's say your partial is a button, see below example:
  - 
	```
	<!-- Contents of partial, filename is _button.html -->
	<button>{{name}}</button>
	<!-- End contents -->

	<!-- Usage in a template/page -->
	{{> _button.html
	  name = "hello"
	}}
	<!-- End usage -->

	<!-- Outputs -->
	<button>hello</button>
	<!-- End output -->
	```
- **./src/assets/js & ./src/assets/sass**
  - Here you will find the source files for JavaScript and SASS
  - The JavaScript on the template that we were provided by AWS contains many, many scripts, some compiled with libraries and some duplicated libraries of different versions... (indeed, a mess) but we must leave these alone ere we chance certain functionalities in their analytics/navigation/footer breaking. This unfortunately also means that libraries like bootstrap.js are really buggy and probably others too. I have only found success in using vanilla javascript and jquery and as such, it's probaably best to stick with these and add to the `scripts.js`
  - The SASS folder contains 3 types of files, A 'page' SASS file (i.e. `win-on-aws.scss`) which imports bootstrap css, does some global modifications like adding in aws buttons and also imports our custom styles, namespaced. When you create a new page, create a copy of this file (make modifications if you need like importing the correct respective `custom-xxx.scss` file) and name it the same as your page. The other file you will see is `_vars.scss` this is the file where you would copy over any variable from bootstrap variables file and modify, removing the `!default` afterwords too. Variables in this file will overwrite the bootstrap ones. And finaly we have the `custom-xxx.scss` files, these are where you will put any SASS for the components you will develop.

## The helpers and why we need them

You will come across a helpers folder in the project, they contain 2 files, one called `prod.js` and one called `raw.js`. The prod.js file allows you to return a boolean of true or false depending on the node enviroment. in normal development mode (`npm start`), the NODE_ENV is set to 'development' returning a false value and in  production (`npm run build`), it is set to 'production' returning a true value. this allows you to hide and show content based on the enviroment if you combine with panini's/handlebars built in helpers `{{#if}}` and `{{#ifequal}}` like so:

```
{{#if (prod) }}
Shows only when in NODE_ENV='production'
{{/if}}

{{#ifequal (prod) false }}
Shows only when in NODE_ENV='development'
{{else}}
Shows only when in NODE_ENV='production'
{{/ifequal}}
```

This is useful for us as when we add a template to Marketo, unfortunately AWS admins never checked the option to stop the WYSIWYG editor from adding container divs around your code, therefore at times when you need to add in repeatable content that is only repeatable through markup in the WYSIWYG editor on Marketo, then know that that content is inside another div which will probably screw your styles. therefore, style your components with the extra div and in your code, only show that div in development mode via wrapping with `{{#ifequal (prod) false }}`. this way, you can test and preview locally with identical markup as it will be on live. Identifying these div's will be annoying at first no doubt... but good luck ^^b

The second helper `raw.js` is used for when you want to add handlebars parameters for the platform you are coding for but don't want them parsed by your own project. for example:

```
<!-- Input -->
---
var: some-var
---

{{{{raw}}}}
{{var}}
{{{{/raw}}}}
<!-- End input -->

<!-- Outputs -->
{{var}}
<!-- End output -->

<!-- Instead of -->
some-var
<!-- End instead -->
```

## Key info for Marketo templates

To make sure your guided landing page is editable within the platform itself, you must use some Marketo specific `meta` tags and use some Marketo conventions. All are pretty easy to grasp and is well documented here: [Create a Guided Landing Page Template](https://docs.marketo.com/display/public/DOCS/Create+a+Guided+Landing+Page+Template "^^b")

## The outputs

So after being happy with your page, you can run `npm run build` and the output will be in the `dist` folder, you will now need to upload your css/js file (named same as your page) to Marketo, in Design Studio => Images and Files => Other => css/js (respectively). your page will be in `dist/pages` and you should copy the html contents of the page into a new `landing page template` that you can create from Marketo as follows:

- Goto Design Studio
- New => Landing page template
- Enter fields for folder, name, editing mode, desc like so
  - LUXUS-TEST
  - [IN DEVELOPMENT] !AWS - {{your-page-name}} - Responsive & Tokenized LP
  - Guided
  - {{any-desc-you-like-or-none}}

You will need to approve the landing page template by right click => approve draft (or just approve, I can't remember). Currently only my account has permission to approve templates with no further plans to add others to be able to do so from AWS's side. therefore, when the need arrises that you may need to approve a template, give me a ping.

## Post build (new program and tokenisation)

So we are Finished with our build and we have our files and assets on Marketo now, but we have one last thing we need to do. We need to actually create a program in 'Marketing Activities' in Marketo and then import our landing page. This is as follows:

-	Goto Marketing Activities
- Under TESTING LUXUS, click new => new program
- Enter fields campaign folder, name, type, channel, desc as follows:
  - TESTING LUXUS
  - [TEST] {{your-page-name}} LP
  - Default
  - AWS Website
  - {{any-desc-you-like-or-none}}
- Next, right click your new program and click, 'new local asset'
- Select Landing Page
- Enter fields for name, page url, desc and template as follows
  - Landing Page
  - {{this-will-auto-populate-after-choosing-a-name}}
  - {{any-desc-you-like-or-none}}
  - {{choose-the-landing-page-you-made-from-the-list}} (only approved landing pages show up here)
- Click create

The final things you will have to do is first, click the program and then goto the tokens tab. Here you will add tokens you need from the right sidebar of the type you would like (i.e. rich text for multi line text/code or text for image url's and such). name the tokens appropriately like so: 

`01_hero-image-url` and maarketo will append `my.` to it to make it `my.01_hero-image-url`, add some dummy value in the content and save. do this for all tokens you will need and it's best to try and make the tokens sequential to how they appear in the page.

Next, click the landing page in the program that you made, then edit draft. this will open a new page that will let you edit any of the booleans, strings, and editable areas. Replace content in all these areas and string fields with tokens that you just made (NOTE: here is where Marketo will add a <div> around your tokens in the rich text editor, sometimes this is fine, sometimes note, test to find out). select the booleans you require and the page will auto save. now you can go back to your landing page in marketing activities and preview.

If all content is placed in the tokens and you build your page to take into account for the extra divs Marketo adds, then you should be good to go. Bear in mind any change you need to make to the landing page in Design Studio, will need to be reapproved. so ping me again ^^b

## Note

If you want to look at example code to help you build, look at all the files for `win-on-aws.html` and respective files (all pages use same script file). This is because some time ago, the original src for `sap-on-aws.scss` was lost, the live, compiled version of this file is still available on Marketo though.  