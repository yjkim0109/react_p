import Header from '../common/Header';
import Visual from './Visual';
import Vids from './Vids';
import Pics from './Pics';
import New from './New';
import Btns from './Btns';

function Main() {
	return (
		<>
			<Header type={'main'} />
			<Visual />
			<Vids />
			<Pics />
			<New />
			<Btns />
		</>
	);
}

export default Main;