The **mno-validation** component provides the layout of a validation line.
it offers a simple interface to notify a user of its action.

### mno-validation settings

* `valid` - (Default: false)
  Accepts boolean variables checking the validity

* `message` -
  Accepts a quick message describing what is being validated

### Style personalization
You can modify the style of mno-validation by changing the following less variables.

- @mno-validation-unchecked-color: grey;
- @mno-validation-checked-color: green;


### Demo
The following example shows how to use mno-validation.
We want to notify the user when the password contains more than 8 characters.
The length of the password is stored in the variable password.length. 
Depending on its value mno-validation will display a checked icon or not.
``` html
<mno-validation 
  valid="password.length" 
  message="Contains more then 8 characters" >
</mno-validation>
```
