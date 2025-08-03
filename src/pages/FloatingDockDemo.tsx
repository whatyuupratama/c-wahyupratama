import { useState, useEffect } from 'react';
import { FloatingDock } from '../../src/compoenents/ui/floating-dock';
import {
  IconBrandGithub,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandTiktok,
  IconHome,
  IconBrandMedium,
} from '@tabler/icons-react';
import { MdVerified } from 'react-icons/md';

export function FloatingDockDemo() {
  const [umur, setUmur] = useState('');

  useEffect(() => {
    const birthDate = new Date('2004-07-03T00:00:00');

    const updateAge = () => {
      const now = new Date();

      // Tahun dan bulan
      let years = now.getFullYear() - birthDate.getFullYear();
      let months = now.getMonth() - birthDate.getMonth();

      // Hitung hari: selisih hari dari tanggal lahir bulan ini ke hari ini
      let days;
      if (now.getDate() >= birthDate.getDate()) {
        days = now.getDate() - birthDate.getDate();
      } else {
        months -= 1;
        // Ambil jumlah hari di bulan sebelumnya
        const prevMonth = now.getMonth() - 1 < 0 ? 11 : now.getMonth() - 1;
        const prevYear =
          prevMonth === 11 ? now.getFullYear() - 1 : now.getFullYear();
        const daysInPrevMonth = new Date(prevYear, prevMonth + 1, 0).getDate();
        days = daysInPrevMonth - birthDate.getDate() + now.getDate();
      }
      if (months < 0) {
        years -= 1;
        months += 12;
      }

      // Hitung detik sisa sejak jam 00:00 hari ini
      const startOfDay = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        0,
        0,
        0
      );
      const secondsSinceStartOfDay = Math.floor(
        (now.getTime() - startOfDay.getTime()) / 1000
      );
      const secondsFormatted = secondsSinceStartOfDay.toLocaleString('id-ID');

      const tanggalSekarang = now.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
      setUmur(
        `${years} tahun, lebih ${months} bulan, ${days} hari, ${secondsFormatted} detik (per ${tanggalSekarang})`
      );
    };

    updateAge();
    const interval = setInterval(updateAge, 1000);

    return () => clearInterval(interval);
  }, []);

  const links = [
    {
      title: 'Home',
      icon: (
        <IconHome className='h-full w-full text-neutral-500 dark:text-neutral-300' />
      ),
      href: '/',
    },
    {
      title: 'Instagram',
      icon: (
        <IconBrandInstagram className='h-full w-full text-neutral-500 dark:text-neutral-300' />
      ),
      href: 'https://www.instagram.com/alvprma.2cn/',
    },
    {
      title: 'LinkedIn',
      icon: (
        <IconBrandLinkedin className='h-full w-full text-neutral-500 dark:text-neutral-300' />
      ),
      href: 'https://www.linkedin.com/in/wahyupratamaa/',
    },
    {
      title: 'TikTok Utama',
      icon: (
        <IconBrandTiktok className='h-full w-full text-neutral-500 dark:text-neutral-300' />
      ),
      href: 'https://www.tiktok.com/@haijust_?is_from_webapp=1&sender_device=pc',
    },
    {
      title: 'TikTok Branding',
      icon: (
        <IconBrandTiktok className='h-full w-full text-neutral-500 dark:text-neutral-300' />
      ),
      href: 'https://www.tiktok.com/@_userjavascript?is_from_webapp=1&sender_device=pc',
    },
    {
      title: 'Medium',
      icon: (
        <IconBrandMedium className='h-full w-full text-neutral-500 dark:text-neutral-300' />
      ),
      href: 'https://medium.com/@wahyupratama_',
    },
    {
      title: 'GitHub',
      icon: (
        <IconBrandGithub className='h-full w-full text-neutral-500 dark:text-neutral-300' />
      ),
      href: 'https://github.com/whatyuupratama',
    },
  ];
  return (
    <div className='flex items-center justify-center h-[45rem] w-full'>
      <div className='flex flex-col items-center  w-max mx-auto'>
        <div className='flex flex-col items-start justify-center gap-6  py-8 px-4 max-w-3xl'>
          <div className='flex-shrink-0'>
            <img
              src='https://media.licdn.com/dms/image/v2/D4E03AQFjPuSC71XyHQ/profile-displayphoto-scale_400_400/B4EZgQuxGtHoAg-/0/1752627353908?e=1756944000&v=beta&t=b2hbQDzP2OaqD4YTPLgRPWCgO0AzLHkUvWtS4G6Ty9s'
              alt='side'
              className='w-22 h-22  rounded-full object-cover mx-auto shadow-lg'
            />
          </div>
          <div className='text-start md:text-left text-base md:text-lg text-neutral-700 dark:text-neutral-200'>
            kalau ini pertama kali kamu baca tentang aku — hai, aku wahyu
            pratama umur <strong>{umur}</strong>.. aku sudah di bidang tech
            sejak juni 2024. di sini aku bakal banyak berbagi soal perjalanan
            sebagai software developer (ts/py).
            <br />
            <div className='flex items-center gap-1'>
              cheers, wahyu pratama <MdVerified color='#0095f6' />
            </div>
          </div>
        </div>
      </div>
      <FloatingDock items={links} />
    </div>
  );
}
