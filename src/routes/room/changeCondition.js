import Swal from "sweetalert2"
import { levelList } from '../modal/room/create/levelList';
import { algorithmList } from '../modal/room/create/algorithmList';

const swalLevelList = () => {
    const levels = {};

    levelList.forEach(level => {
        levels[level.value] = level.name;
    })

    return levels;
}

const swalAlgorithmList = () => {
    const algoritms = {};

    algorithmList.forEach(algoritm => {
        algoritms[algoritm.name] = algoritm.name
    })

    return algoritms
}

export const changeRoomCondition = async (changeRoom) => {
    const result = await Swal.fire({
        icon: 'error',
        title: "해당 조건의 문제가 없습니다.",
        text: "조건을 다시 선택해 주세요",
        input: "select",
        inputOptions: swalLevelList(),
        inputPlaceholder: '난이도 선택',
        showCancelButton: true,
        cancelButtonText: '취소',
        inputValidator: (value) => {
            if (!value) {
                return '난이도를 재설정해주세요.';
            }
        }
    });
    if(!result.isConfirmed) return;
    const selectedLevel = result.value;
    const result2 = await Swal.fire({
        icon: 'error',
        title: "해당 조건의 문제가 없습니다.",
        text: "조건을 다시 선택해 주세요",
        input: "select",
        inputOptions: swalAlgorithmList(),
        inputPlaceholder: '알고리즘 선택',
        showCancelButton: true,
        cancelButtonText: '취소',
        inputValidator: (value_3) => {
            if (!value_3) {
                return '알고리즘을 재설정해주세요.';
            }
        }
    });
    const selectedAlgorithm = result2.value;
    changeRoom(selectedLevel, selectedAlgorithm);
}