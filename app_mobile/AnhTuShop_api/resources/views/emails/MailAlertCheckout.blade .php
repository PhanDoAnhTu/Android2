<!DOCTYPE html>
<html>
<head>
    <title>AnhTuShop</title>
</head>
<body>
    <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
  <div style="margin:50px auto;width:70%;padding:20px 0">
    <div style="border-bottom:1px solid #eee">
      <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">{{ $mailData['title'] }}</a>
    </div>
    <p style="font-size:1.1em">Hi, {{ $mailData['email'] }}</p>
    <p>Chúc mừng bạn đã đặt hàng thành công, hãy chú ý thời gian để nhận hàng, xin cảm ơn! !</p>
    <p style="font-size:0.9em;">Regards, {{ $mailData['email'] }}<br />AnhTuShop</p>
    <hr style="border:none;border-top:1px solid #eee" />
    <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
      <p>AnhTuShop</p>
      <p>Chao mung ban den voi binh nguyen vo tan</p>
      <p>Việt Nam</p>
    </div>
  </div>
</div>
</body>
</html>