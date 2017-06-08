SELECT
	@r AS _id,
	(
		SELECT
			@r := FJCKID
		FROM
			(
				SELECT
					FJCKID,
					GUID
				FROM
					CKB
				WHERE
					JXSID = 810000000013
			) m
		WHERE
			m.GUID = _id
	) AS parent_id
FROM
	(SELECT @r := 900000005125) vars,
	CKB
WHERE
	@r != 0