
# ===================
# 🛑  We no longer support this system, please see the latest version with <a href="https://codecanyon.net/item/attendance-with-fingerprint-android-system-managemnet/25407573">Laravel here</a> 🛑 
# ===================

<img src="https://user-images.githubusercontent.com/11581453/71761352-d3529200-2f04-11ea-8880-304bf4b4b849.png" width="150">

# Attendance with Fingerprint Management
Simple application for employee attendance using fingerprint. <b>(You need install Attendance with Fingerprint on Google Play for attendance) https://play.google.com/store/apps/details?id=com.aandt.attendacewithfingerprint </b>

Created By me [Abed Putra](https://connectwithdev.com/)

# Want to get an Android application source code?
https://codecanyon.net/item/attendance-with-fingerprint-android-system-managemnet/25407573

# Feature
- Add user
- Delete user
- Ban, Unban user
- Register new user sent to email token
- Forget password
- Role user level
- Edit user profile
- Gravatar user profile
- Recaptcha by Google
- List employees attendance
- Export employee attendance to CSV or XLS
- Check your employee attendance late or ontime every day
- Review your employee attendance for 1 week, 1 month, 1 Years etc

![Attendance-login-system](https://user-images.githubusercontent.com/11581453/74153592-ee26cd80-4c4b-11ea-867d-4c7252e1d9cf.png)

![Attendance-login-system](https://user-images.githubusercontent.com/11581453/71766143-b8e5dc00-2f37-11ea-97ff-e973ea4d0a2a.png)

# User Level
- is_admin
- is_user (Your employee or student)
- is_subscriber

# Wiki
https://github.com/abedputra/attendance-with-fingerprint-management/wiki

# login
- Pass : admin
- User : admin@gmail.com

# Check User Level
controller.php
```
//check user level
if(empty($data['role'])){
    redirect(site_url().'main/login/');
}
$dataLevel = $this->userlevel->checkLevel($data['role']);
//check user level

if($dataLevel == "is_admin"){
  (your code here)
}
```
# Warning
<b>(You need install Attendance with Fingerprint on Google Play for attendance) https://play.google.com/store/apps/details?id=com.aandt.attendacewithfingerprint. Attendance with Fingerprint Management can't working without App</b>
<br><br>
***This application can't working without Attendance with Fingerprint, so please download first on Google Play.***
<br><br>

<br>

----------------------------------------------------------------------------------------------------------------------------------------

# -----How to use this application ?
Please follow 2 steps:<br>
1. Settings System Management
Please check this<br>
https://github.com/abedputra/attendance-with-fingerprint-management/wiki/Settings-Management-System-%3F<br>
Please check this video how to istall the system
https://www.youtube.com/watch?v=s8pZl5UoT40

2. Settings Android Application<br>
Please check this<br>
https://github.com/abedputra/attendance-with-fingerprint-management/wiki/Settings-the-app-%3F

# -----How to get KEY?
-Go to Attendance login system link<br>
-Login<br>
-Go to settings<br>
-Click get Key<br>
-Save<br>
-Dont forget to add KEY to your application<br>

# -----How to get my employees data?
-Go to Attendance login system link<br>
-Login<br>
-Go to employee menu<br>

----------------------------------------------------------------------------------------------------------------------------------------

<br>
<br>
<br>

# Support me
Support me at <a href="https://www.patreon.com/abedputra">Patron</a>

# About
Attendance with Fingerprint Management is based on the [codeigniter](https://github.com/bcit-ci/CodeIgniter). Attendance login system is based frontend on the Bootstrap framework created by  [Mark Otto](https://twitter.com/mdo) and [Jacob Thorton](https://twitter.com/fat).
Password hashing with PBKDF2, Author: [havoc AT defuse.ca](https://github.com/defuse).
Ported to CodeIgniter by [Richard Thornton](http://twitter.com/RichardThornton).
CodeIgniter Curl Libraries by [Philip Sturgeon](https://github.com/philsturgeon).

If you have question, please email me : abedputra@gmail.com
Visit: https://connectwithdev.com/

# LICENSE
The MIT License (MIT).

Copyright (c) 2020, Abed Putra.

Please feel free to send me an email if you have any problems.
Thank you so much, my email : contact@abedputra.my.id.
