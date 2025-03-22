const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mailjet = require('node-mailjet').connect(
    '51946083187c060d8ddcdea0f6e804fb', // API Key
    'b70e81588cb68e759a87e8753c688555'  // Secret Key
);

const app = express();
const port = 3000;
const ip = '0.0.0.0'; // Tüm ağ cihazlarından erişime izin verir

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));  // HTML ve CSS dosyalarını sunar

// 📌 E-posta Gönderme API'si
app.post('/send-email', (req, res) => {
    const { name, message } = req.body;

    const request = mailjet.post('send', { version: 'v3.1' }).request({
        Messages: [
            {
                From: {
                    Email: 'merdem58171.3@gmail.com',  // Sabit gönderen e-posta
                    Name: name, // Kullanıcının girdiği isim
                },
                To: [
                    {
                        Email: 'merdem58171.3@gmail.com',
                        Name: 'Alıcı',
                    },
                ],
                Subject: 'Yeni Mesaj Var!',
                TextPart: message,
                HTMLPart: `<h3>${message}</h3>`,
            },
        ],
    });

    request
        .then((result) => {
            console.log(result.body);
            res.json({ success: true });
        })
        .catch((err) => {
            console.log(err.statusCode);
            res.status(500).json({ success: false, error: err.message });
        });
});

// 📌 Sunucuyu Belirtilen IP Üzerinde Başlat
app.listen(port, ip, () => {
    console.log(`🚀 Sunucu çalışıyor: http://192.168.1.35:${port}`);
});
