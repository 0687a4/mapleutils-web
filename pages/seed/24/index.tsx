import {
    Avatar,
    Card,
    CardContent,
    Grid,
    ListItem,
    Paper,
    Tab,
    Tabs,
    Tooltip,
    Typography,
    useMediaQuery,
} from '@mui/material';
import { MusicPlayer, TrackInfo } from '@components/music-player';
import { seed24AudioData } from '@data/seed/24';
import { Seo, SeoProps } from '@components/seo';
import { TitleCard } from '@components/card';
import { Comments } from '@components/comments';
import VirtualizedFixedList from '@components/virtualized-list/VirtualizedFixedList';
import useWindowDimensions from '@hooks/useWindowDimensions';
import { useCallback, useEffect, useState } from 'react';
import { isHangulMatching } from '@tools/string';
import { useTheme } from '@mui/system';
import { TabContext, TabPanel } from '@mui/lab';
import useCopy from '@hooks/useCopy';
import { LocalStorageHelper, LocalStorageKey } from '@tools/localStorageHelper';

const seoProps: SeoProps = {
    title: '더 시드 24층',
    keywords: ['24층', 'bgm', '브금', '족보'],
    description: '더 시드 24층 브금 모음',
    image: '/images/24.png',
};


const useSeed24Tabs = () => {
    const [tab, setTab] = useState<string>('bgm');

    useEffect(() => {
        const tab = LocalStorageHelper.load<string>(LocalStorageKey.SEED_24_TAB);
        setTab(tab);
    }, []);

    const onChangeTab = (tab: string) => {
        localStorage.setItem(LocalStorageKey.SEED_24_TAB, tab);
        setTab(tab);
    };

    return {
        tab,
        onChangeTab,
    };
};


const Seed24 = () => {
    const { height } = useWindowDimensions();
    const { copy, CopySnackbar } = useCopy();

    const rowRenderer = useCallback(
        (item: TrackInfo) => (
            <Tooltip arrow placement={'top'} title={<Typography>{item.name} 복사하기</Typography>}>
                <ListItem button onClick={() => copy(item.name)}>
                    <Grid container spacing={1} alignItems={'center'}>
                        <Grid item xs={3} sm={2} md={1}>
                            <Avatar variant={'rounded'} src={item.coverImg} alt={item.name} />
                        </Grid>
                        <Grid item xs={9} sm={2} md={2}>
                            <Typography variant={'h6'} component={'div'}>
                                {item.name}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={8} md={9}>
                            <Typography variant={'body1'} component={'div'}>
                                {item.hint}
                            </Typography>
                        </Grid>
                    </Grid>
                </ListItem>
            </Tooltip>
        ),
        [],
    );

    const searchFilter = useCallback((item: TrackInfo, pattern: string) => {
        return isHangulMatching(pattern, item.name, item.hint);
    }, []);


    const theme = useTheme();
    const smDown = useMediaQuery(theme.breakpoints.down('sm'));

    const { tab, onChangeTab } = useSeed24Tabs();

    const handleChangeTab = (_: any, value: string) => {
        onChangeTab(value);
    };

    return (
        <>
            <Seo {...seoProps} />
            <TitleCard title={'시드 24층'} />

            <TabContext value={tab}>
                <Paper variant={'outlined'}>
                    <Tabs value={tab} onChange={handleChangeTab} centered>
                        <Tab value={'bgm'} label={'브금'} />
                        <Tab value={'hint'} label={'힌트'} />
                    </Tabs>
                </Paper>

                <TabPanel sx={{ padding: `${theme.spacing(1)} 0` }} value={'bgm'}>
                    <Card elevation={0} variant={'outlined'} component={'section'}>
                        <CardContent>
                            <MusicPlayer tracks={seed24AudioData} />
                        </CardContent>
                    </Card>
                </TabPanel>
                <TabPanel sx={{ padding: `${theme.spacing(1)} 0` }} value={'hint'}>
                    <Card elevation={0} variant={'outlined'} component={'section'}>
                        <CardContent>
                            <VirtualizedFixedList items={seed24AudioData}
                                                  height={height - 400}
                                                  width={'100%'}
                                                  rowSize={smDown ? 110 : 60}
                                                  divider
                                                  searchFilter={searchFilter}
                                                  placeholder={'힌트 검색 (예: 리스항구, 푸른빛, ㅍㄹㅂ, ...) [Ctrl] + [F] 또는 [F3]으로 포커싱, 초성 검색 ✅'}
                                                  rowRenderer={rowRenderer} />
                        </CardContent>
                    </Card>
                </TabPanel>

                <CopySnackbar />
            </TabContext>

            <Comments pageKey={'seed24'} />
        </>
    );
};

export default Seed24;