import React, {useState} from 'react';
import './CourseItem.scss';
import { Image, Button, Icon, Confirm } from 'semantic-ui-react';
import { ENV } from '../../../../utils';
import { BasicModal } from '../../../SharedComponents/BasicModal';
import { CourseForm } from "../indexCourse";
import { CourseApi } from '../../../../api/apiCourse';
import { useAuth } from '../../../../Hooks/useAuth';


const courseController = new CourseApi();

export function CourseItem(props) {

    const { course, onReload } = props;
    const { accessToken } = useAuth();


    const [showModal, setShowModal] = useState(false);
    const [titelModal, setTitelModal] = useState("");
    const [confirmMessage, setconfirmMessage] = useState("");
    const [showConfirm, setShowConfirm] = useState(false);
    const [isDelete, setIsDelete] = useState(false);

    const openModal = () => setShowModal(prevState => !prevState);
    const openConfirm = () => setShowConfirm(prevState => !prevState);

    const handleEdit = () => {
        setTitelModal(`Editar ${course.title}`);
        openModal();
    }

    const openActivationConfirm = () => {
        setIsDelete(false);
        setconfirmMessage(course.active ? `¿Desactivar ${course.title}?` : `¿Activar ${course.title}?`);
        openConfirm();
    }

    const openDeleteConfirm = () => {
        setIsDelete(true);
        setconfirmMessage(`¿Eliminar ${course.title}?`);
        openConfirm();
    }

    const courseDelete = async () => {
        try {
            await courseController.deleteCourse(course._id, accessToken);
            onReload();
            openConfirm();
        } catch (error) {
            console.error(error);
        }
    }

    const courseActivation = async () => {
        try {
            await courseController.updateCourse(accessToken, course._id, {active: !course.active});
            onReload();
            openConfirm();
        } catch (error) {
            console.error(error);
        }
    }

  return (
    <>
    <div className="course-item">
        <div className="course-item__info">
            <Image src={course.miniature ? `${ENV.BASE_PATH}/${course.miniature}` :'https://react.semantic-ui.com/images/avatar/small/matt.jpg'} avatar />
                <div>
                    <p>{course.title}</p>
                    <p>{course.description}</p>
                    <p>{course.url}</p>
                    <p>{course.price}</p>
                    <p>{course.score}</p>
                </div>
        </div>
        <div className="user-item__actions">
            <Button icon primary onClick={handleEdit}>
                <Icon name="pencil alternate" />
            </Button>
            <Button icon color={course.active ? 'orange' : 'teal'} onClick={openActivationConfirm}>
                <Icon name={course.active ? "ban" : "check"} />
            </Button>
            <Button icon color="red" onClick={openDeleteConfirm}>
                <Icon name="trash" />
            </Button>
        </div>
    </div>

    <BasicModal show={showModal} onClose={openModal} title={titelModal}>
        <CourseForm close={openModal} onReload={onReload} course={course} />
    </BasicModal>

    <Confirm open={showConfirm} onCancel={openConfirm} onConfirm={isDelete? courseDelete :courseActivation } content={confirmMessage} size='mini' />
    </>


  )
}
