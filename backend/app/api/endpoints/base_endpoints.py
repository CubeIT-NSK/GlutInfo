from fastapi import APIRouter

router = APIRouter()

@router.get('/reviews')
async def get_review():
    """Get users's reviews"""

@router.get('/test_results')
async def get_test_results_of_user():
    """Get results of user tests"""

@router.post('/register')
async def register_user():
    """Add user to db"""

@router.get('/events')
async def get_all_events():
    """Get all events"""

@router.get('/places')
async def get_all_places():
    """Get all places"""

@router.get('/documents')
async def get_all_documents():
    """Get all documents"""

@router.get('/histories')
async def get_user_histories():
    """Get user's histories """

@router.get('/projects')
async def get_all_projects():
    """Get all company's projects"""

@router.get('/doctors')
async def get_doctors():
    """Get all doctors"""

@router.get('/user')
async def get_user_info():
    """Get user info"""

@router.post('/change_service')
async def user_change_service():
    """Change user's service"""

@router.post('/choose_price')
async def user_choose_price():
    """User choose price"""

@router.get('/balance')
async def get_balance():
    """Get user balance"""

@router.post('/edit_user')
async def edit_user():
    """User change profile"""

@router.get('/my_consultations')
async def user_consultations():
    """Get user's consultations"""

@router.get('/messages')
async def get_messages():
    """"""

@router.post('/messages')
async def post_messages():
    """"""
@router.get('/notifications')
async def get_notifications():
    """Get user's notifications"""

@router.post('/sign_up')
async def sign_up_user():
    """Sign up user"""

@router.get('/login')
async def login_user():
    """"""

@router.post('/questionnaire')
async def user_answer_questionnaire():
    """User's answer of questionnaire"""

@router.get('/news')
async def get_news():
    """Get all news"""