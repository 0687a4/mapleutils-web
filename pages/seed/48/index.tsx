import { TitleCard } from '@components/card';
import { Card, CardContent, Typography } from '@mui/material';
import { VideoCapture } from '@components/video-capture';
import { Comments } from '@components/comments';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { Seo } from '@components/seo';
import useI18nSeoProps from '@components/seo/useI18nSeoProps';
import NextImage from 'next/image';


const Seed48 = () => {
    const { t } = useTranslation();
    const seoProps = useI18nSeoProps('seed48');
    return (
        <>
            <Seo {...seoProps} image={'/images/48.png'} />
            <TitleCard title={t('title', { ns: 'seed48' })} />
            <Card variant={'outlined'} sx={theme => ({ marginBottom: theme.spacing(1) })}>
                <CardContent>
                    <VideoCapture />
                </CardContent>
            </Card>
            <Card variant={'outlined'}>
                <CardContent>
                    <Typography variant={'h3'}>{t('mapGuide', { ns: 'seed48' })}</Typography>
                    <NextImage src={'/images/seed/48.png'} width={3760} height={1270} />
                </CardContent>
            </Card>
            <Comments pageKey={'seed48'} />
        </>
    );
};


export const getStaticProps = async ({ locale }: { locale: string }) => {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common', 'seed48'])),
        },
    };
};

export default Seed48;