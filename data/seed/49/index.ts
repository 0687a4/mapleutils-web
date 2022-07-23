import data from './data.json';

export interface SeedMobData {
    name: string;
    width: number;
    height: number;
    img: string;
}

export interface SeedLocation {
    location: string;
    mobs: SeedMobData[];
}

export const seed49Data: SeedLocation[] = data.map(l => ({
    ...l,
    mobs: l.mobs.map(m => ({
        ...m,
        img: encodeURI(`/images/seed/49/${m.name}.png`),
    })),
}));

export const seed49KmsFilter: Set<string> = new Set(
    [
        '로얄 카투스',
        '루이넬',
        '루팡',
        '리게이터',
        '멜러디',
        '모래거인',
        '묘선',
        '미스릴 뮤테',
        '변절자 스포아',
        '별다람쥐',
        '빨간 달팽이',
        '사이티',
        '삼단지',
        '삼미호',
        '샐리온',
        '서전아이',
        '스켈레톤 사병',
        '스켈레톤 장교',
        '스켈레톤 지휘관',
        '스쿠버 페페',
        '스텀프',
        '스톤버그',
        '스톤볼',
        '스티지',
        '아이스 드레이크',
        '아이언보어',
        '엄티',
        '엑스텀프',
        '원공',
        '원시멧돼지',
        '이끼 달팽이',
        '이끼버섯',
        '이상한 돼지',
        '젤리피쉬',
        '좀비루팡',
        '좀비버섯',
        '주니어 그류핀',
        '주니어 라이오너',
        '주니어 루이넬',
        '주니어 셀리온',
        '주황버섯',
        '중독된 돼지',
        '천록',
        '청화사',
        '초록버섯',
        '친위대 페페',
        '카파 드레이크',
        '캡틴',
        '커즈아이',
        '콜드아이',
        '쿨 젤리피쉬',
        '큐브슬라임',
        '크로코',
        '크루',
        '투구 페페',
        '트리로드',
        '파란 달팽이',
        '판다곰',
        '푸퍼',
        '호걸',
        '호돌이',
        '호문',
        '호문쿨루',
        '호저',
        '홍화사',
        '화난 불가사리',
        '흑저',
    ],
);