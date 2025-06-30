import { ref } from 'vue'
import { breakpoint } from 'mdui'

export var navOpened = ref(breakpoint().up('md'));

export function UpdateNavOpened(val:boolean = breakpoint().up('md')){
    navOpened.value = val;
}