# Install & use

`npm install`

`npm start` To run dev (allows you to render markup that should be missing from Production)

`npm run build` To run production (preview of page will look bad but only becaause some maarkup won't be generated as you will need to manually add this in to marketo's landing page under marketing activities in the WYSIWYG, more on this later.)

## Overview of the project

This project is a flat file compiler project using panini to create AAWS landing pages.

You will have a few main folders you will work in:

- ./src/pages/pages
  - Here you will create a new `.html` file that will contain the components of the page you will build, the contents of this file get injected in the `{{> body}}` tag in the layout template. 
- ./src/layouts
  - Here is where you will create a boiler plate that contains `{{> body}}` and any other variables or partials you create to act as a template for your pages. All pages you make will use the 'default' template by... default lol, but if you wish to use an alternate template then in your pages, use frontmatter at the very top of yout page to declare a layout variable with the value equal to the file name of the html layout (minus the .ext). Below is an example of front matter:
  - 
	```
	---
	var: some-var
	layout: another-template
	---
	```
  - Note that the 'var' in the example can be used as `{{var}}` in your page or bubble up to the template file and it's values will always be parsed as a string (no quote marks are needed)
- ./src/partials
  - While partials are currently not being used, you may if you want, create a html file in the partials folder, usual practice is to name it `_partial-name.html` (underscore to denote it is a partial and not just a mere variable). the to use it in a page or template: `{{> _partial-name}}`
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



