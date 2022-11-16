/* eslint-disable react-hooks/exhaustive-deps */
import moment from 'moment';
import { useEffect, useMemo, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { IDay, statistic } from '../../../state/statistic';
import { weekState } from '../../../state/weekState';
import Select, { components, DropdownIndicatorProps } from 'react-select';
import './filter.css';
import { obj } from '../../Icon';
import { statisticOneDayState } from '../../../state/statisticOneDay';

interface IFilter {
  className?: string;
}
const options = [
  { value: 'Эта неделя', label: 'Эта неделя' },
  { value: 'Прошедшая неделя', label: 'Прошедшая неделя' },
  { value: '2 недели назад', label: '2 недели назад' },
];
const customStyles = {
  indicatorSeparator: () => ({
    display: 'none',
  }),
  control: (provided: any) => ({
    ...provided,
    padding: '20px 15px',
    cursor: 'pointer',
    border: 'none',
    backgroundColor: 'var(--color-grey-light)',
  }),
  menu: (provided: any) => ({
    ...provided,
    top: '90%',
    boxShadow: 'none',
    filter: 'drop-shadow(0px 10px 63px rgba(0, 0, 0, 0.07))',
    width: '100%',
  }),

  menuList: (provided: any) => ({
    ...provided,
    backgroundColor: 'var(--color-grey-light)',
    padding: '0',
  }),
  option: (provided: any) => ({
    ...provided,
    padding: '25px',
    backgroundColor: 'transparent',

    borderTop: '1px solid #DEDEDE',
    cursor: 'pointer',
  }),
};
const DropdownIndicator = (
  props: DropdownIndicatorProps<{ value: string; label: string }, boolean>
) => {
  return (
    <components.DropdownIndicator {...props}>
      {props.isFocused ? obj.selectArrowOpen : obj.selectArrow}
    </components.DropdownIndicator>
  );
};

export function Filter({ className }: IFilter) {
  const statisticData = useRecoilValue(statistic);
  const setWeekStatistic = useSetRecoilState(weekState);
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const oneDaySet = useSetRecoilState(statisticOneDayState);

  // динамический шаблон пустого дня
  const emptyDay = (i: number, j: number) => {
    const emptyDay: IDay = {
      week: moment().subtract(j, 'w').week(),
      date: moment().subtract(j, 'w').weekday(i).format('L'),
      day: Number(moment().weekday(i).format('e')),
      dayText: moment().weekday(i).format('dd'),
      totalWorkTime: 0,
      totalNumberOFtomatoes: 0,
      focusTime: 0,
      pauseTime: 0,
      breakTime: 0,
      stopping: 0,
    };
    return emptyDay;
  };

  // восстановление недель
  const weekRecovery = (arr: IDay[], j: number) => {
    for (let i = 0; i !== 7; i++) {
      if (!arr[i]) {
        i === 0 ? arr.push(emptyDay(i, j)) : arr.splice(i, 0, emptyDay(i, j));
      } else if (arr[i] && arr[i].day !== i) {
        arr.splice(i, 0, emptyDay(i, j));
      }
    }
  };

  const twoWeeksAgo = useMemo(() => {
    const arr = statisticData.filter((el) => {
      return el.week === moment().subtract(2, 'w').week();
    });
    weekRecovery(arr, 2);
    return arr;
  }, [statisticData]);

  const lastWeek = useMemo(() => {
    const arr = statisticData.filter((el) => {
      return el.week === moment().subtract(1, 'w').week();
    });
    weekRecovery(arr, 1);
    return arr;
  }, [statisticData]);

  const thisWeek = useMemo(() => {
    const arr = statisticData.filter((el) => {
      return el.week === moment().week();
    });
    weekRecovery(arr, 0);
    return arr;
  }, [statisticData]);

  useEffect(() => {
    if (selectedOption.value === '2 недели назад') {
      setWeekStatistic(twoWeeksAgo);
      oneDaySet(twoWeeksAgo[0]);
    } else if (selectedOption.value === 'Прошедшая неделя') {
      setWeekStatistic(lastWeek);
      oneDaySet(twoWeeksAgo[0]);
    } else {
      setWeekStatistic(thisWeek);
      oneDaySet(twoWeeksAgo[0]);
    }
  }, [selectedOption.value]);

  function output(
    newOption:
      | { value: string; label: string }
      | ((prevState: { value: string; label: string }) => {
          value: string;
          label: string;
        })
      | null
  ) {
    newOption !== null && setSelectedOption(newOption);
  }
  return (
    <div className={`filter ${className}`}>
      <Select
        isMulti={false}
        styles={customStyles}
        defaultValue={selectedOption}
        onChange={(newOption) => output(newOption)}
        options={options}
        className='select'
        components={{ DropdownIndicator }}
        blurInputOnSelect={true}
        hideSelectedOptions={true}
        menuPlacement='auto'
        theme={(theme) => ({
          ...theme,
          colors: {
            ...theme.colors,
            primary: 'var(--color-grey-light)',
          },
        })}
      />
    </div>
  );
}
