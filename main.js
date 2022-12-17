import './style.css';
import ThreeWorld from './ThreeWorld';
import Scrollbar from 'smooth-scrollbar';

const canvas = document.querySelector('canvas.webgl');
const sections = document.querySelectorAll('section.sec');

const scrollbar = Scrollbar.init(document.querySelector('#app'));

const threeWorld = new ThreeWorld(canvas, scrollbar, sections);
threeWorld.init();
