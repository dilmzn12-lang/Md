
DO $$
DECLARE
  cat_id uuid;
BEGIN
  INSERT INTO public.menu_categories (slug, sort_order, emoji, name_ar, name_en, name_ku)
  VALUES ('fakhar', 100, '🍲', 'أطباق الفخار', 'Clay Pot Dishes', 'خواردنی فەخار')
  ON CONFLICT (slug) DO UPDATE SET name_ar = EXCLUDED.name_ar, name_en = EXCLUDED.name_en, name_ku = EXCLUDED.name_ku, emoji = EXCLUDED.emoji
  RETURNING id INTO cat_id;

  IF cat_id IS NULL THEN
    SELECT id INTO cat_id FROM public.menu_categories WHERE slug = 'fakhar';
  END IF;

  INSERT INTO public.menu_items (category_id, sort_order, name_ar, name_en, name_ku, desc_ar, desc_en, desc_ku, price, available, tags)
  VALUES
    (cat_id, 1, 'فخارة كباب بلدي', 'Baladi Kebab Clay Pot', 'فەخاری کەبابی بەڵەدی',
     'كباب لحم بلدي مطهو ببطء في فخارة طينية مع الطماطم والفلفل والبصل.',
     'Traditional kebab slow-cooked in a clay pot with tomato, peppers and onion.',
     'کەبابی بەڵەدی بە هێواشی لە فەخاری قوڕدا کوڵاوە لەگەڵ تەماتە و بیبەر و پیاز.',
     12.0, true, ARRAY['MD']::text[]),
    (cat_id, 2, 'فخارة دجاج بالخضار', 'Chicken Clay Pot with Vegetables', 'فەخاری مریشک بە سەوزە',
     'قطع دجاج طرية مع خضار موسمية في صلصة فخار غنية.',
     'Tender chicken pieces with seasonal vegetables in a rich clay-pot sauce.',
     'پارچەکانی مریشکی نەرم لەگەڵ سەوزەی وەرزی لە سۆسێکی دەوڵەمەند.',
     10.5, true, ARRAY[]::text[]),
    (cat_id, 3, 'فخارة غنم موزة', 'Lamb Shank Clay Pot', 'فەخاری ساقی بەران',
     'موزة غنم مطهوة ببطء حتى تذوب مع البهارات الشرقية الفاخرة.',
     'Lamb shank slow-cooked until tender with premium Oriental spices.',
     'ساقی بەرانی هێواش کوڵاوە لەگەڵ بەهاراتی ڕۆژهەڵاتی نایاب.',
     15.0, true, ARRAY['MD']::text[])
  ON CONFLICT DO NOTHING;
END $$;
