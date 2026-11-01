/**
 * Re-export Firestore instance and query methods from root firebase module
 */
export { 
  db, 
  collection, 
  query, 
  where, 
  orderBy, 
  getDocs, 
  INITIAL_GERMAN_BLOG_POSTS 
} from '../../firebase';
