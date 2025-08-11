import { useState, useEffect, useRef } from 'react';
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
import { BackgroundBeamsWithCollision } from '../compoenents/ui/background-beams-with-collision';
import { IoLocationOutline } from 'react-icons/io5';

export function FloatingDockDemo() {
  const [umur, setUmur] = useState('');

  useEffect(() => {
    const birthDate = new Date('2004-07-03T00:00:00');

    const pad2 = (n: number) => n.toString().padStart(2, '0');

    const updateAge = () => {
      const now = new Date();
      const years = now.getFullYear() - birthDate.getFullYear();
      const months = now.getMonth() - birthDate.getMonth();

      // Hari = tanggal hari ini (misal 4 jika 4 Agustus)
      const days = now.getDate();

      // Selalu tampilkan bulan
      const showMonth = true;

      // Hitung jam, menit, detik sejak jam 00:00 hari ini
      const nowHour = now.getHours();
      const nowMinute = now.getMinutes();
      const nowSecond = now.getSeconds();

      // Format hasil dengan dua digit untuk jam, menit, detik
      let result = `${years} tahun, lebih`;
      if (showMonth && months > 0) {
        result += ` ${months} bulan, `;
      }
      result += ` ${days} hari, `;
      result += ` ${pad2(nowHour)} jam, ${pad2(nowMinute)} menit, ${pad2(
        nowSecond
      )} detik`;

      setUmur(result);
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
  // Refs untuk elemen yang ingin dideteksi collision
  const profileImgRef = useRef<HTMLImageElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  return (
    <BackgroundBeamsWithCollision
      className='min-h-screen'
      targetRefs={[
        profileImgRef as unknown as React.RefObject<HTMLElement>,
        textRef as unknown as React.RefObject<HTMLElement>,
      ]}
    >
      <div className='flex items-center justify-center min-h-screen w-full'>
        <div className='flex flex-col items-center  w-max mx-auto'>
          <div className='flex flex-col items-start justify-center gap-6  py-8 px-4 max-w-3xl'>
            <span className='text-gray-500 opacity-45 flex items-center justify-end gap-2 text-sm flex-wrap max-w-xs sm:max-w-none break-words'>
              <IoLocationOutline />
              <span className='block sm:inline'>
                Malang -
                <span className='hidden sm:inline'> Sulawesi Barat</span>
                <span className='inline sm:hidden'>
                  <br />
                  Sulawesi Barat
                </span>
              </span>
            </span>
            <div className='flex gap-2 items-center justify-center'>
              <img
                ref={profileImgRef}
                src='https://media.licdn.com/dms/image/v2/D4E03AQFjPuSC71XyHQ/profile-displayphoto-scale_400_400/B4EZgQuxGtHoAg-/0/1752627353908?e=1756944000&v=beta&t=b2hbQDzP2OaqD4YTPLgRPWCgO0AzLHkUvWtS4G6Ty9s'
                alt='side'
                className='w-22 h-22  rounded-full object-cover mx-auto shadow-xl'
              />
            </div>
            <div
              ref={textRef}
              className='text-start md:text-left text-base md:text-lg text-neutral-700 dark:text-neutral-200'
            >
              kalau ini pertama kali kamu baca tentang aku — hai, aku wahyu
              pratama{' '}
              <a className=' font-bold opacity-80 text-[#8D0B41]'> {umur}</a>.
              journey of a software developer. ts/py.
              <div className='mt-2'>
                et, aku juga owner joki score turnitin, artikel ilmiah,
                publikasi, web/app, dll. klik
                <a
                  className='underline decoration-pink-500 cursor-pointer'
                  href='https://www.instagram.com/muakstudyterus.id'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <br /> @muakstudyterus.id
                </a>{' '}
                semua dihandle worker gemastik, intern bca/dbs, msib, dll
                <div className='flex items-center gap-1'>
                  cheers, wahyu pratama <MdVerified color='#0095f6' />
                </div>
              </div>
            </div>
          </div>
        </div>
        <FloatingDock items={links} />
      </div>
    </BackgroundBeamsWithCollision>
  );
}
