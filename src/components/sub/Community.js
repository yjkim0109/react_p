import Layout from '../common/Layout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { useRef, useState, useEffect } from 'react';

function Community() {
	const input = useRef(null);
	const textarea = useRef(null);

	const inputEdit = useRef(null);
	const textareaEdit = useRef(null);

	// 로컬스토리지에 있는 데이터 가져오기
	const getLocalData = () => {
		const dummyPosts = [
			{
				title: 'What is Acqua di Parma’s mission?',
				content:
					'To share with the world the yellow gift of the Italian Sun, Soul, and Style.',
			},
			{
				title: 'Scented celebrations of love',
				content:
					'The most special time of your life has met its scented partner.',
			},
			{
				title: 'The ingredients of a product',
				content: 'Where can I find the ingredients of a product?',
			},
			{
				title: 'I love it.',
				content:
					"I purchased a product from your online Boutique. It's arrived beautifully packaged in very iconic yellow box. Grazie. ",
			},
			{
				title: 'The luxury amenities hotel line',
				content:
					'The line includes a wide range of products, from bath and shower gel to hair products and body care.',
			},
		];

		const data = localStorage.getItem('post');
		if (data) {
			return JSON.parse(data);
		} else {
			return dummyPosts;
		}
	};

	const [Posts, setPosts] = useState(getLocalData());
	const [Allowed, setAllowed] = useState(true);

	//글 저장 함수
	const createPost = () => {
		if (!input.current.value.trim() || !textarea.current.value.trim()) {
			return alert('Please enter your title and content.');
		}
		setPosts([
			{ title: input.current.value, content: textarea.current.value },
			...Posts,
		]);

		resetForm();
	};

	// 폼 리셋 함수
	const resetForm = () => {
		input.current.value = '';
		textarea.current.value = '';
	};

	// 글 삭제 함수
	const deletePost = (index) => {
		const newPosts = Posts.filter((_, idx) => idx !== index);
		setPosts(newPosts);
	};

	// 글 수정모드 변경 함수
	const enableUpdate = (index) => {
		if (!Allowed) return;
		setAllowed(false);

		setPosts(
			Posts.map((post, idx) => {
				if (idx === index) post.enableUpdate = true;
				return post;
			})
		);
	};

	// 출력 모드 변경
	const disableUpdate = (index) => {
		setAllowed(true);
		setPosts(
			Posts.map((post, idx) => {
				if (idx === index) post.enableUpdate = false;
				return post;
			})
		);
	};

	// 실제 글 수정 함수
	const updatePost = (index) => {
		if (!inputEdit.current.value.trim() || !textareaEdit.current.value.trim()) {
			resetForm();
			return alert('Please type your new title and content');
		}

		setPosts(
			Posts.map((post, idx) => {
				if (idx === index) {
					post.title = inputEdit.current.value;
					post.content = textareaEdit.current.value;
					post.enableUpdate = false;
				}
				return post;
			})
		);
		setAllowed(true);
	};

	useEffect(() => {
		localStorage.setItem('post', JSON.stringify(Posts));
	}, [Posts]);

	return (
		<Layout name={'Community'}>
			<div className='title'>
				<h2>We'd love to hear from you.</h2>
				<div className='line'></div>
			</div>
			<div className='input_box'>
				<input type='text' placeholder='Title' ref={input} />
				<br />
				<textarea
					cols='30'
					rows='3'
					placeholder='Content'
					ref={textarea}></textarea>
				<br />
				<div className='btns'>
					<button onClick={createPost}>
						<FontAwesomeIcon icon={faPen} />
					</button>
					<button>
						<FontAwesomeIcon icon={faXmark} />
					</button>
				</div>
			</div>

			<div className='show_box'>
				{Posts.map((post, idx) => {
					return (
						<article key={idx}>
							{post.enableUpdate ? (
								<>
									<div className='editText'>
										<input
											type='text'
											ref={inputEdit}
											defaultValue={post.title}
										/>
										<br />
										<textarea
											cols='30'
											rows='3'
											ref={textareaEdit}
											defaultValue={post.content}></textarea>
										<br />
										<div className='btns'>
											<button onClick={() => updatePost(idx)}>
												<FontAwesomeIcon icon={faCheck} />
											</button>
											<button onClick={() => disableUpdate(idx)}>
												<FontAwesomeIcon icon={faXmark} />
											</button>
										</div>
									</div>
								</>
							) : (
								<>
									<div className='txt'>
										<h3>{post.title}</h3>
										<p>{post.content}</p>
									</div>
									<div className='btns'>
										<button onClick={() => enableUpdate(idx)}>EDIT</button>
										<button onClick={() => deletePost(idx)}>DELETE</button>
									</div>
								</>
							)}
						</article>
					);
				})}
			</div>
		</Layout>
	);
}

export default Community;
