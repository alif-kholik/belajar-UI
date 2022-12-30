import FAQItem from "./FAQItem"

const DATA = [
    {
        asked: 'Bagaimana cara memesan produk?',
        answer: 'Masuk di halaman Hubungi Kami, lalu hubungi admin kami melalu Whatsapp, Email atau Instagram.'
    },
    {
        asked: 'Bagaimana cara mengetahui ketersediaan produk?',
        answer: 'Silahkan hubungi admin kami untuk informasi ketersediaan produk.'
    },
    {
        asked: 'Kuantitas Minimum Order (MOQ)',
        answer: 'Kuantitas Minimum Order kami mulai dari 1 yard.'
    },
    {
        asked: 'Apakah warna kain di foto sama dengan aslinya?',
        answer: `Dikarenakan perbedaan display setiap device, akan ada toleransi perbedaan warna kain di foto dengan aslinya sekitar 10%. Untuk mendapatkan warna yang lebih akurat, silahkan hubungi Admin kami untuk mendapatkan buku katalog warna kami.`
    },
    {
        asked: 'Bagaimana cara mendapatkan sample produk?',
        answer: 'Anda dapat mengunjungi toko offline kami atau hubungi admin kami melalui Whatsapp untuk mendapatkan katalog produk.',
    },
    {
        asked: 'Syarat dan Ketentuan untuk mengembalikan Barang?',
        list: [
            'Pastikan kain masih dalam kondisi utuh 100%. (Tidak ada klaim yang tersedia setelah pemotongan)',
            'Anda dapat mengembalikan kain jika ada cacat atau rusak lebih dari 3 - 5% pada barang',
            'Sertakan bukti invoice pembelian dari Kain Moeji'
        ]
    },
    {
        asked: 'Lokasi pengiriman dari mana?',
        answer: 'Lokasi pengiriman kami dari Jalan Dulatip, Bandung.'
    },
    {
        asked: 'Syarat & Ketentuan untuk pemesanan produk desain secara khusus (customized product)?',
        answer: 'Kain Moeji menyediakan berbagai jenis kain yang dapat dipesan secara custom; tenun, rajut dan lace. Silakan hubungi admin kami untuk detail lebih lanjut.'
    },
]

const FAQLayout = ({ data = DATA }) => {
    return (
        <>
            <section>
                <div className={`max-w-screen-lg mx-auto p-[30px_20px]`}>
                    <h3 className={`text-MO1 text-[24px] md:text-[36px] leading-[100%] text-center mb-[30px]`}>Frequently Asked Questions</h3>
                    <div className={`flex flex-col gap-[20px]`}>
                        {
                            data.map((e, i) => (
                                <FAQItem data={ e } key={ i }/>
                            ))
                        }
                    </div>
                </div>
            </section>
        </>
    )
}

export default FAQLayout